import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, Message } from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import PatientStore from '../../../app/stores/patientStore';
import patientStore from '../../../app/stores/patientStore';

export default observer(function AddNewPatient() {
    const { patientStore, modalStore } = useStore();

    const selectedPatient = {
        firstName: '',
        lastName: '',
        age: '',
        registeredSince: '',
        email: '',
        status: '',
        error: null,
        role: '',
        username: '',
        diagnosis: '',

    }


    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email().required('A valid email is required'),
        age: Yup.string().required('Age is required'),
        status: Yup.string().required('Status is required'),
    })

    return (
        <>
            <Header as='h1' content='Add a new patient' />
            <Divider />
            {/*
            <Formik
                initialValues={selectedPatient}
                onSubmit={(values, { setErrors }) => patientStore.create(values).catch(error =>
                    setErrors({ error }))}
                    // onSubmit={(values) => createPatient(values).catch(error => console.log(error))}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <ErrorMessage
                            name='error' render={() =>
                                <Message negative content={errors.error} />}
                        />
                        <Header sub content='Personal details' />
                        <MyTextInput name='firstName' placeholder='First name' />
                        <MyTextInput name='lastName' placeholder='Last name' />
                        <MyTextInput name='age' placeholder='Age' />
                        <Divider />
                        <Header sub content='Login credentials' />
                        <MyTextInput name='email' type='email' placeholder='Email' />
                        <MyTextInput name='status' placeholder='Status' />
                        {<MyTextInput name='registerdSince' type="date" placeholder='Resgisterd since' />}
                        <Divider />
                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} positive type='submit' content='Submit'
                        />
                        <Button basic color='red' content='Cancel' onClick={modalStore.closeModal} />
                    </Form>
                )}
            </Formik>
                            */}
        </>

    )
})