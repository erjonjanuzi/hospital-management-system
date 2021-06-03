import {observer} from "mobx-react-lite";
import {Button,Modal,Card, Form, Header, Divider} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import React, { useEffect } from 'react'
import * as Yup from 'yup';
import { Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";

interface Props{
    Id: string
}

export default observer(function ViewCityPage({Id} : Props){

    const { cityStore : {loadCity,seletedCity,updateCity},modalStore} =useStore();
    
    useEffect(() => {
    if(Id)loadCity(Id);
    }, [Id,loadCity]);



    return(
        <>
            <Header as='h1' content='Edit City ' />
            <Divider />
            <Formik
                initialValues={seletedCity!}
                onSubmit={(values) => updateCity(values).catch(error => console.log(error))}
                enableReinitialize

            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='City details' />
                        <MyTextInput name='Id' placeholder='Id' />
                        <MyTextInput name='name' placeholder='Name' />
                        <Divider />
                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} positive type='submit' content='Submit'
                            onClick ={()=>updateCity.name}

                        />
                        <Button basic color='red' content='Cancel' onClick={modalStore.closeModal} />
                    </Form>
                )}
            </Formik>
        </>
    )
})