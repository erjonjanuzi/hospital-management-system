import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Card, Divider, Header, Item, Label, Message, Segment } from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Appointment } from '../../../app/models/appointment';

export default observer(function AppointmentForm() {
    const { modalStore, userStore, appointmentsStore } = useStore()

    const validationSchema = Yup.object({
        description: Yup.string().required('Description is required'),
        date: Yup.string().required('Date is required')
    })

    const medicalReasons = [
        { key: '', value: '', text: '' }
    ]

    const appointment: Appointment = {
        status: 'Pending',
        date: new Date,
        description: '',
        patientId: userStore.user?.id!
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
                        <Header sub content='Date and Time' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <MyTextInput
                            name='description'
                            label='haha'
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