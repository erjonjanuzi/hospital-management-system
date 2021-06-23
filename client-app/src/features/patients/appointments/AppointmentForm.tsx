import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, Label, Message } from 'semantic-ui-react';
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
                        <Header sub content='Date and Time' />
                        <MyDateInput 
                            placeholderText='Date'  
                            name='date' 
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Label content='Description' />
                        <MyTextInput 
                            name='description'
                        />
                        <Divider />
                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} positive type='submit' content='Submit'
                        />
                        <Button basic color='red' content='Cancel' onClick={modalStore.closeModal} />
                    </Form>
                )}
            </Formik>
        </>
    )
})