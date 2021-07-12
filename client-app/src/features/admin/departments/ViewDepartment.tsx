import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from 'react';
import { Button, Divider, Form, Header } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";

interface Props {
    id: string
}


export default observer(function ViewDepartment({ id }: Props) {

    const { departmentStore: { loadDepartment, selectedDepartment, updateDepartment }, modalStore } = useStore();

    useEffect(() => {
        if (id) loadDepartment(id);
    }, [id, loadDepartment]);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        capacity: Yup.string().required('Capacity is required'),
        description: Yup.string().required('Description is required'),




    })


    return (
        <>
            <Header as='h1' content='Edit Department ' />
            <Divider />
            <Formik
                initialValues={selectedDepartment!}
                onSubmit={(values) => updateDepartment(values).catch(error => console.log(error))}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='details' />
                        <MyTextInput name='name' placeholder='Name' />
                        <MyTextInput name='capacity' placeholder='Capacity' />
                        <MyTextInput name='description' placeholder='Description' />

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