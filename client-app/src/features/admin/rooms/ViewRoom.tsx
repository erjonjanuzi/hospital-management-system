import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from 'react';
import { Button, Divider, Form, Header } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from '../../../app/common/form/MySelectInput';
import { useStore } from "../../../app/stores/store";

interface Props{
    id: string
}

export default observer(function ViewRoom({id} : Props){

    const { roomStore : {loadRoom,selectedRoom,updateRoom},modalStore} =useStore();

    useEffect(() => {
    if(id)loadRoom(id);
    }, [id,loadRoom]); 

    const validationSchema = Yup.object({
        roomNo: Yup.string().required('RoomNo is required'),
       
    })

    const types = [
        { key: '1', text: 'Critical Care Unit', value:'Critical Care Unit'  },
        { key: '2', text: 'Critical Room', value: 'Critical Room' },
        { key: '3', text: 'Emergency Unit', value: 'Emergency Unit' },
        { key: '4', text: 'Intensive Treatment Unit', value: 'Intensive Treatment Unit' },
        
      ]


    return(
        <>
            <Header as='h1' content='Edit Room ' />
            <Divider />
            <Formik
                initialValues={selectedRoom!} 
                onSubmit={(values) => updateRoom(values).catch(error => console.log(error))}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='details' />
                        <MyTextInput name='roomNo' placeholder='Name' />
                        <MySelectInput name='roomType' placeholder='Room Type' options={types} />
                        <MyTextInput name='patient' placeholder='Patient' />

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