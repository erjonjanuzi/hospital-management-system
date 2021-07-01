import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { Button, Divider, Form, Header } from "semantic-ui-react";
import { Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";

interface Props{
    id : string;
}

export default observer(function EditRegisteredPatients({id}:Props){

    const{registerPatientStore :{loadRegisteredPatient,selectedPatient,updateRegisteredPatient},modalStore} = useStore();

    useEffect(() => {
    if(id)loadRegisteredPatient(id);
    }, [id,loadRegisteredPatient]);

    const gender =[
        {key:'m', value :'M' , text:'M'},
        {key:'f', value :'F' , text:'F'},
        {key:'other', value :'Other' , text:'Other'}
    ]    
    const allergic =[
        {key:'yes', value :'Yes' , text:'Yes'},
        {key:'no', value :'No' , text:'No'},
    ]

    return(
        <>
            <Header as='h1' content='Registered Patient' color='green' inverted />
            <Divider />
            <Formik
                initialValues={selectedPatient!} 
                onSubmit={(values) => updateRegisteredPatient(values).catch(error => console.log(error))}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='Registered Patient' color='green' inverted/>
                        <Form.Group widths={2}> 
                        <MyTextInput name='firstName' placeholder='First Name' label="First Name:"/>
                        <MyTextInput name='lastName' placeholder='Last Name'label="Last Name:" />
                        </Form.Group>
                        <Form.Group widths={2}> 
                        <MySelectInput name='gender' placeholder='Gender'label="Gender:" options={gender} />
                        <MyTextInput name='phone' placeholder='Phone' label="Phone:" />
                        </Form.Group>
                        <Form.Group widths={3}> 
                        <MyTextInput name='email' placeholder='Email' label="Email:"/>
                        <MyTextInput name='address' placeholder='Address' label="Address:"/>
                        <MyTextInput name='about' placeholder='About' label="About:"/>
                        </Form.Group>
                        <Form.Group widths={2}>
                        <MySelectInput name='allergic' placeholder='Allergic' label="Allergic:" options={allergic}/>
                        </Form.Group>
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