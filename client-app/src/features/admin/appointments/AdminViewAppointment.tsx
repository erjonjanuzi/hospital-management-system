import { Formik, Form, ErrorMessage } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Divider, Grid, Header, Icon, Image, Item, List, Message, Modal, Segment } from "semantic-ui-react";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { AccountDto } from "../../../app/models/user";
import { useStore } from "../../../app/stores/store";

interface Props {
    id: string
}

export default observer(function ViewAppointment({ id }: Props) {
    const { modalStore, appointmentsStore: { loadAppointment, selectedAppointment, assignDoctor }, accountManagementStore } = useStore();
    const [form, setForm] = useState(false);

    let doctors = [
        { key: '', value: '', text: '' }
    ]

    const test = async () => {
        await accountManagementStore.loadAccounts();
    }

    const insert = async () => {
        let temp = accountManagementStore.accounts.filter(x => x.role === 'doctor');
        for (let i = 0; i < temp.length; i++) {
            let item = {
                key: temp[i].id,
                value: temp[i].id,
                text: temp[i].firstName + ' ' + temp[i].lastName
            };
            doctors.push(item);
        }
    }

    useEffect(() => {
        if (id) loadAppointment(id);
        test();
        insert();
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
                    <Segment.Group>
                        <Segment>
                            <Icon name='calendar' color='teal' /><span>{selectedAppointment?.date.toString().split('T')[0]}</span>
                        </Segment>
                        <Segment>
                            <Icon name='time' color='teal' /><span>{selectedAppointment?.date.toString().split('T')[1]}</span>
                        </Segment>
                        <Segment>
                            {selectedAppointment?.description}
                        </Segment>
                        <Segment color='red' inverted>
                            {selectedAppointment?.status}
                        </Segment>
                    </Segment.Group>
                    <Button content='Assign doctor' color='green' onClick={() => setForm(true)} />
                    <Button content='Deny request' color='red' />
                    {form &&
                        <Segment>
                            <Formik
                                initialValues={{ appointmentId: selectedAppointment?.id, doctorId: '' }}
                                onSubmit={(values) => assignDoctor(values.appointmentId, values.doctorId)
                                    .catch(error => console.log(error))}
                                enableReinitialize
                            >
                                {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
                                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                        <MySelectInput placeholder='Doctor' name='doctorId' options={doctors} label='Pick a doctor' />
                                        <Button disabled={isSubmitting || !dirty || !isValid}
                                            loading={isSubmitting} positive type='submit' content='Submit'
                                        />
                                        <Button basic color='red' content='Cancel' onClick={() => setForm(false)} />
                                    </Form>
                                )}
                            </Formik>
                        </Segment>}
                </Grid.Column>
            </Grid>
        </>
    );
});