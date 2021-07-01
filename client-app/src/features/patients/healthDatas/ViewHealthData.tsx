import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from 'react';
import { Button, Divider, Form, Header } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";
import MySelectInput from "../../../app/common/form/MySelectInput";

interface Props{
    id: string
}


export default observer(function ViewHealthData({id}:Props){

    const { healthDataStore : {loadHealthData,selectedHealthData,updateHealthData},modalStore} =useStore();

    useEffect(() => {
    if(id)loadHealthData(id);
    }, [id,loadHealthData]); 

    const validationSchema = Yup.object({
      //  name: Yup.string().required('Name is required'),
        
    })
     const option = [
        { key: '1', text: 'medications', value:'Medications'  },
        { key: '2', text: ' latex/rubber products', value: ' Latex/Rubber Products' },
        { key: '3', text: 'other (e.g. hayfever, foods)', value: 'Other (e.g. hayfever, foods)' },
        { key: '3', text: 'none', value: 'None' },
       
      ]


    return(
        <>
            <Header as='h1' content='Edit Health Records ' />
            <Divider />
            <Formik
                initialValues={selectedHealthData!} 
                onSubmit={(values) => updateHealthData(values).catch(error => console.log(error))}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header as='h4'> 1.Are you being treated for any medical condition at the present or have you been treated within the past year?</Header>
                        <MyTextInput name='medication'/>
                        <Header as='h4'>2.When was your last medical checkup? </Header>
                        <MyTextInput name='checkup'/>
                        <Header as='h4'>3.Are you taking any medications, non-prescription drugs or herbal supplements of any kind?</Header>
                        <MyTextInput name='drugs'/>
                        <Header as='h4'>4.Do you have any allergies? Please list using the categories below:</Header>
                        <MySelectInput name='allergies' placeholder='allergies' options={option}/>
                        <Header as='h4'>5.Have you ever had a peculiar or adverse reaction to any medicines or injections?</Header>
                        <MyTextInput name='injections'/>
                        <Header as='h4'>6.Do you have or have you ever had asthma?</Header>
                        <MyTextInput name='asthma'/>
                        <Header as='h4'>7.Have you ever had hepatitis, jaundice or liver disease?</Header>
                        <MyTextInput name='disease'/>
                        <Header as='h4'>8.Do you have any conditions or therapies that could affect your immune system,
                                         e.g. leukemia, AIDS, HIV infection, radiotherapy, chemotherapy? </Header>
                        <MyTextInput name='immune'/>
                        <Header as='h4'>9.Do you smoke or chew tobacco products?</Header>
                        <MyTextInput name='smoke'/>
                        <Header as='h4'>10.Are there any diseases or medical problems that run in your family?
                                         (e.g. diabetes, cancer or heart disease) </Header>
                       <MyTextInput name='relatives'/>  
                        
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