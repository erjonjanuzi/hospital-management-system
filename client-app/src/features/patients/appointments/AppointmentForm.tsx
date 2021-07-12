import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Card, Divider, Header, Item, Message, Segment } from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Appointment } from '../../../app/models/appointment';
import MyTextArea from '../../../app/common/form/MyTextArea';

export default observer(function AppointmentForm() {
    const { modalStore, userStore, appointmentsStore } = useStore()

    const validationSchema = Yup.object({
        reason: Yup.string().required('A medical reason is required'),
        date: Yup.string().required('Date is required')
    })

    const medicalReasons = [
        { key: 'chest', value: 'Chest Pain', text: 'Chest Pain' },
        { key: 'abdominal', value: 'Abdominal Pain', text: 'Abdominal Pain' },
        { key: 'toothaches', value: 'Toothaches', text: 'Toothaches' },
        { key: 'brokenbones', value: 'Broken Bones and Sprains', text: 'Broken Bones and Sprains' },
        { key: 'respiratory', value: 'Respiratory infections', text: 'Respiratory infections' },
        { key: 'contusions', value: 'Contusions and Cuts', text: 'Contusions and Cuts' },
        { key: 'back', value: 'Back Pain', text: 'Back Pain' },
        { key: 'skin', value: 'Skin Infections', text: 'Skin Infections' },
        { key: 'objects', value: 'Foreign objects in the body', text: 'Foreign objects in the body' },
        { key: 'headaches', value: 'Headaches', text: 'Headaches' },
        { key: 'checkup', value: 'General Medical Checkup', text: 'General Medical Checkup' },
        { key: 'other', value: 'Other', text: 'Other' }
    ]

    const appointment: Appointment = {
        status: 'Pending',
        date: new Date,
        reason: '',
        comment: '',
        patientId: userStore.user?.id!,
    }

    return (
        <>
            <Header as='h1' content='New Appointment' />
            <Divider />
            <Formik
                initialValues={appointment}
                validationSchema={validationSchema}
                onSubmit={(values) => appointmentsStore.create(values).catch(error =>
                    console.log(error))}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='Your details' />
                        <Message
                            icon='user'
                            header='Patient data is used from your profile'
                            content='Your data is only visible to you and the hospital'
                        />
                        <Card>
                            <Segment textAlign='center'>
                                <Item.Image style={{ marginBottom: 3 }} size='tiny' circular src='/assets/user.png' />
                                <Item.Content>
                                    <Item.Header>{userStore.user?.firstName + ' ' + userStore.user?.lastName}</Item.Header>
                                </Item.Content>
                                <Item.Content>
                                    +383 43 922 666
                                </Item.Content>
                                <Item.Content>
                                    {userStore.user?.email}
                                </Item.Content>
                                <Item.Content>
                                    Rr. Muharrem Fejza, Prishtina 10000 Kosovo
                                </Item.Content>
                            </Segment>
                        </Card>
                        <Divider />
                        <Header sub content='Date and Time (between 08:00AM and 08:00PM)' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <MySelectInput placeholder='Reason' name='reason' options={medicalReasons} label='Reason for your appointment' />
                        <MyTextArea
                            placeholder='Comment here...'
                            rows={3}
                            name='comment'
                            label='You can leave a comment here (Optional)'
                        />
                        <Button.Group>
                            <Button disabled={isSubmitting || !dirty || !isValid}
                                loading={isSubmitting} positive type='submit' content='Submit'
                            />
                            <Button.Or />
                            <Button onClick={modalStore.closeModal}>Cancel</Button>
                        </Button.Group>
                    </Form>
                )}
            </Formik>
        </>
    )
})