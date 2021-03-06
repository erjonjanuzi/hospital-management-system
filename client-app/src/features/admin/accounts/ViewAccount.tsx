import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Divider, Header } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';

interface Props {
    id: string
}

export default observer(function ViewAccount({ id }: Props) {
    const { accountManagementStore: { loadAccount, selectedAccount, update }, modalStore } = useStore();

    useEffect(() => {
        if (id) loadAccount(id);
    }, [id, loadAccount]);

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email().required('A valid email is required'),
        userName: Yup.string().required('Username is required'),
    })

    return (
        <>
            <Header as='h1' content='Edit user credentials' />
            <Divider />
            <Formik
                initialValues={selectedAccount!}
                onSubmit={(values) => update(values).catch(error => console.log(error))}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='Personal details' />
                        <MyTextInput name='firstName' placeholder='First Name' />
                        <MyTextInput name='lastName' placeholder='Last Name' />
                        <Divider />
                        <Header sub content='Login credentials' />
                        <MyTextInput name='userName' placeholder='Username' />
                        <MyTextInput name='email' type='email' placeholder='Email' />
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