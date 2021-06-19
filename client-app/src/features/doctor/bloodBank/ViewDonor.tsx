import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from 'react';
import { Button, Divider, Form, Header } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";

interface Props{
    id: string
}


export default observer(function ViewDonor({id} : Props){

    const { bloodBankStore : {loadBloodBank,seletedBloodBank,updateBloodBank},modalStore} =useStore();

    useEffect(() => {
    if(id)loadBloodBank(id);
    }, [id,loadBloodBank]); 

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        
       


    })


    return(
        <>
            <Header as='h1' content='Edit Donor ' />
            <Divider />
            <Formik
                initialValues={seletedBloodBank!} 
                onSubmit={(values) => updateBloodBank(values).catch(error => console.log(error))}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='details' />
                        <MyTextInput name='name' placeholder='Name' />
                        <MyTextInput name='age' placeholder='Age' />
                        <MyTextInput name='email' placeholder='Email' />
                        <MyTextInput name='mobile' placeholder='Mobile' />

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