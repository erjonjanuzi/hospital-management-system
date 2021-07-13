import { Formik, Form, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Label, Message, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function RegisterForm() {
    const { userStore: { register } } = useStore();

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email().required('A valid email is required'),
        username: Yup.string().required('Username is required'),
        passwordHash: Yup.string().required('Password is required'),
    })

    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', username: '', email: '', passwordHash: '', role: 'patient', error: null }}
            onSubmit={(values, { setErrors }) => register(values).catch(error =>
                setErrors({ error }))}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <ErrorMessage
                        name='error' render={() =>
                            <Message negative content={errors.error} />}
                    />
                    <Segment textAlign='left' basic>
                        <Label basic content='First name' />
                        <MyTextInput name='firstName' placeholder='First name' />
                        <Label basic content='Last name' />
                        <MyTextInput name='lastName' placeholder='Last name' />
                        <Label basic content='Username' />
                        <MyTextInput name='username' placeholder='Username' />
                        <Label basic content='Email' />
                        <MyTextInput name='email' type='email' placeholder='Email' />
                        <Label basic content='Password' />
                        <MyTextInput name='passwordHash' placeholder='Password' type='password' />

                        <Button disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting} positive content='Register' type='submit' fluid
                        />
                    </Segment>
                </Form>
            )}
        </Formik>
    )
})