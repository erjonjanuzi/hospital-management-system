import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from 'react';
import { Button, Divider, Form, Header } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";

interface Props{
    id : string
}

export default observer(function ViewReport({id} : Props){
    const {medicalReportStore:{loadReport,selectedReport,updateReport},modalStore}=useStore();

    useEffect(() => {
        if(id)loadReport(id);
        }, [id,loadReport]); 

    const validationSchema = Yup.object({
        firstName : Yup.string().required('First Name is required'),
        lastName : Yup.string().required('Last Name is required')
    }) 

    return(
        <>
        <Header as='h1' content='Edit Report ' />
            <Divider />
            <Formik
                initialValues={selectedReport!} 
                onSubmit={(values) => updateReport(values).catch(error => console.log(error))}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='details' />
                        <MyTextInput name='firstName' placeholder='First Name' />
                        <MyTextInput name='lastName' placeholder='Last Name' />
                        <MyTextInput name='age' placeholder='Age' />
                        <MyTextInput name='report' placeholder='Report' />

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