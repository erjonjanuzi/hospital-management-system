import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, Message } from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';

export default observer(function RegisterNewUserForm() {
    const { accountManagementStore, modalStore } = useStore();

    const selectedAccount = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        passwordHash: '',
        role: '',
        patientsId: "",
        error: null
    }

    const roles = [
        { key: 'admin', value: 'admin', text: 'Admin' },
        { key: 'doctor', value: 'doctor', text: 'Doctor' }
    ]

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email().required('A valid email is required'),
        username: Yup.string().required('Username is required'),
        passwordHash: Yup.string().required('Password is required'),
        role: Yup.string().required('Please pick a role')
    })

    return (
        <>
            <Header as='h1' content='Register new app user' />
            <Divider />
            <Formik
                initialValues={selectedAccount}
                onSubmit={(values, { setErrors }) => accountManagementStore.register(values).catch(error =>
                    setErrors({ error }))}
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
                        <Divider />
                        <Header sub content='Login credentials' />
                        <MyTextInput name='username' placeholder='Username' />
                        <MyTextInput name='email' type='email' placeholder='Email' />
                        <MyTextInput name='passwordHash' type='password' placeholder='Password' />
                        <Divider />
                        <Header sub content='Role management' />
                        <MySelectInput name='role' placeholder='Role' options={roles} />
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