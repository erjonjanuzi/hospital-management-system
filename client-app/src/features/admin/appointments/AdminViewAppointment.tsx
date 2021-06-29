import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Confirm, Divider, Grid, Header, Icon, Item, Label, Segment } from "semantic-ui-react";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { store, useStore } from "../../../app/stores/store";

interface Props {
    id: string
}

export default observer(function ViewAppointment({ id }: Props) {
    const { modalStore, appointmentsStore: { loadAppointment, selectedAppointment, assignDoctor,
        denyAppointment }, accountManagementStore, specialtyStore } = useStore();

    const [form, setForm] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [availableDoctors, setAvailableDoctors] = useState(false);

    function open() {
        setOpenConfirm(!openConfirm);
    }

    let specialties = new Array();
    const insertSpecialties = async () => {
        await specialtyStore.loadSpecialties();
        for (let i = 0; i < specialtyStore.specialties.length; i++) {
            let specialty = {
                key: specialtyStore.specialties[i].id,
                value: specialtyStore.specialties[i].id,
                text: specialtyStore.specialties[i].name
            };
            specialties[i] = specialty;
        }
    }

    let doctors = new Array();
    const getAvailableDoctors = async (id: string) => {
        await specialtyStore.loadDoctors(id);
        for (let i = 0; i < specialtyStore.doctors.length; i++){
            let doctor = {
                key: specialtyStore.doctors[i].id,
                value: specialtyStore.doctors[i].id,
                text: specialtyStore.doctors[i].firstName + ' ' + specialtyStore.doctors[i].firstName
            }
            doctors[i] = doctor;
        }
        setAvailableDoctors(true);
    }

    useEffect(() => {
        if (id) loadAppointment(id);
        insertSpecialties();
    }, [id, loadAppointment, doctors]);

    return (
        <>
            <Header content='Appointment details' />
            <Divider />
            <Grid>
                <Grid.Column width='8' textAlign='center'>
                    <Icon name='user' color='teal' /><span>Patient details</span>
                    <Divider />
                    <Segment>
                        <Item>
                            <Item.Image style={{ marginBottom: 3 }} size='tiny' circular src='/assets/user.png' />
                            <Item.Content>
                                <Item.Header>{selectedAppointment?.patient?.firstName + ' ' + selectedAppointment?.patient?.lastName}</Item.Header>
                            </Item.Content>
                        </Item>
                    </Segment>
                </Grid.Column>
                <Grid.Column width='8' textAlign='left'>
                    <Icon name='info circle' color='teal' /><span>Request details</span>
                    <Divider />
                    {!editMode &&
                        <>
                            <Button
                                onClick={() => setEditMode(true)}
                                icon='edit outline'
                            />
                            <Segment.Group>
                                <Segment>
                                    <Icon name='calendar' color='teal' /><span>{selectedAppointment?.date.toString().split('T')[0]}</span>
                                </Segment>
                                <Segment>
                                    <Icon name='time' color='teal' /><span>{(selectedAppointment?.date.toString().split('T')[1])?.split(":")[0]
                                        + ":" + (selectedAppointment?.date.toString().split('T')[1])?.split(":")[1]}</span>
                                </Segment>
                            </Segment.Group>
                        </>
                    }
                    {editMode &&
                        <>
                            <Formik
                                initialValues={selectedAppointment!}
                                //validationSchema={validationSchema}
                                onSubmit={(values) => store.appointmentsStore.editAppointment(values).catch(error => console.log(error))
                                    .then(() => setEditMode(false))}
                                enableReinitialize
                            >
                                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                        <Header sub content='Date and Time (between 08:00AM and 08:00PM)' />
                                        <MyDateInput
                                            placeholderText='Date'
                                            name='date'
                                            showTimeSelect
                                            timeCaption='time'
                                            dateFormat='MMMM d, yyyy h:mm aa'
                                        />

                                        <Button.Group>
                                            <Button disabled={isSubmitting || !dirty || !isValid}
                                                loading={isSubmitting} positive type='submit' content='Submit'
                                            />
                                            <Button.Or />
                                            <Button onClick={() => setEditMode(false)}>Cancel</Button>
                                        </Button.Group>
                                    </Form>
                                )}
                            </Formik>
                            <br />
                        </>
                    }

                    <Label content='Reason for appointment' />
                    <Segment>
                        {selectedAppointment?.reason}
                    </Segment>
                    <Label content='Comment' />

                    <Segment>
                        {selectedAppointment?.comment ? selectedAppointment.comment : 'No comment'}
                    </Segment>
                    <Segment color='red' inverted>
                        {selectedAppointment?.status}
                    </Segment>
                    <Button content='Assign doctor' color='green' onClick={() => setForm(true)} />
                    <Button content='Deny request' color='red' onClick={open} />
                    {form &&
                        <Segment>
                            <Formik
                                initialValues={{ appointmentId: selectedAppointment?.id, specialtyId: '' }}
                                onSubmit={(values) => getAvailableDoctors(values.specialtyId)}
                                enableReinitialize
                            >
                                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                        <MySelectInput placeholder='Specialty' name='specialtyId' options={specialties} label='Browse specialties' />
                                        <Button disabled={isSubmitting || !dirty || !isValid}
                                            loading={isSubmitting} positive type='submit' content='Get Available doctors'
                                        />
                                        <Button basic color='red' content='Cancel' onClick={() => setForm(false)} />
                                    </Form>
                                )}
                            </Formik>
                            <br />
                            {
                                availableDoctors &&
                                <Formik
                                initialValues={{ appointmentId: selectedAppointment?.id, doctorId: '' }}
                                onSubmit={(values) => assignDoctor(selectedAppointment?.id, values.doctorId)}
                                enableReinitialize
                            >
                                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                    
                                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                        <MySelectInput placeholder='Doctor' name='doctorId' options={doctors} label='Available doctors' />
                                        <Button disabled={isSubmitting || !dirty || !isValid}
                                            loading={isSubmitting} positive type='submit' content='Submit'
                                        />
                                        <Button basic color='red' content='Cancel' onClick={() => setAvailableDoctors(false)} />
                                    </Form>
                                )}
                            </Formik>
                            }
                        </Segment>}
                    <Confirm
                        open={openConfirm}
                        header='Deny appointment request'
                        content='Are you sure?'
                        cancelButton='Cancel'
                        confirmButton="Deny request"
                        onCancel={open}
                        onConfirm={() => denyAppointment(selectedAppointment?.id).then(open)}
                    />
                </Grid.Column>
            </Grid>
        </>
    );
});