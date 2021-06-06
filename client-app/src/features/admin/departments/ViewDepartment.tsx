import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from 'react';
import { Button, Divider, Form, Header } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";

interface Props{
    Id: string
}

export default observer(function ViewDepartment({Id} : Props){

    const { departmentStore : {loadDepartment,seletedDepartment,updateDepartment},modalStore} =useStore();
    
    useEffect(() => {
    if(Id)loadDepartment(Id);
    }, [Id,loadDepartment]);



    return(
        <>
            <Header as='h1' content='Department ' />
            <Divider />
            <Formik
                initialValues={seletedDepartment!}
                onSubmit={(values) => updateDepartment(values).catch(error => console.log(error))}
                enableReinitialize

            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='Departments' />
                        <MyTextInput name='Name' placeholder='Name' />
                        <MyTextInput name='Capacity' placeholder='Capacity' />
                        <MyTextInput name='Description' placeholder='Description' />

                        <Divider />
                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} positive type='submit' content='Submit'
                            onClick ={()=>updateDepartment.name}

                        />
                        <Button basic color='red' content='Cancel' onClick={modalStore.closeModal} />
                    </Form>
                )}
            </Formik>
        </>
    )
})