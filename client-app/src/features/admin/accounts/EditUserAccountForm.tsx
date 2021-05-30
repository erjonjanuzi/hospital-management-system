import { Field, Form, Formik, FormikValues } from 'formik';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Divider, Header } from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';

interface Props {
    id: string
}

export default observer(function EditUserAccountForm({ id }: Props) {
    const { accountManagementStore: { loadAccount, selectedAccount }, modalStore } = useStore();
     ///////////////////////////// delete this file, no longer needed
    /*useEffect(() => {
        if (id) loadAccount(id);
    }, [id, loadAccount]);*/

    function handleFormSubmit(values: any) {
        console.log(values)
    }

    return (
        <>
            <Header as='h1' content='Edit user credentials' />
            <Divider />
            <Formik
                initialValues={{
                    firstName: selectedAccount?.firstName, 
                    lastName: selectedAccount?.lastName,
                    username: selectedAccount?.userName,
                    email: selectedAccount?.email,
                    passwordHash: selectedAccount?.passwordHash,
                }}
                onSubmit={() => handleFormSubmit(selectedAccount)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='Personal details' />
                        <MyTextInput name='firstName' placeholder='First Name' />
                        <MyTextInput name='lastName' placeholder='Last Name' />
                        <Divider />
                        <Header sub content='Login credentials' />
                        <MyTextInput name='username' placeholder='Username' />
                        <MyTextInput name='email' type='email' placeholder='Email' />
                        <MyTextInput name='passwordHash' type='password' placeholder='Password' />
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