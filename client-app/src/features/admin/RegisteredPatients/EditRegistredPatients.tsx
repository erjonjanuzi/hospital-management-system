import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { Button, Divider, Form, Header } from "semantic-ui-react";
import { Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";

interface Props{
    id : string;
}

export default observer(function EditRegisteredPatients({id}:Props){

    const{registerPatientStore :{loadRegisteredPatient,selectedPatient,updateRegisteredPatient},modalStore} = useStore();

    useEffect(() => {
    if(id)loadRegisteredPatient(id);
    }, [id,loadRegisteredPatient]);

    const validationSchema = Yup.object({
        firstName:Yup.string().required('First Name is required'),
        lastName:Yup.string().required('Last Name is required'),
        gender:Yup.string().required('Gender is required'),
        phone:Yup.string().required('Phone is required'),
    })
    return(
        <>
            <Header as='h1' content='Registered Patient' color='green' inverted />
            <Divider />
            <Formik
                initialValues={selectedPatient!} 
                onSubmit={(values) => updateRegisteredPatient(values).catch(error => console.log(error))}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='Registered Patient' color='green' inverted/>
                        <Form.Group widths={2}> 
                        <MyTextInput name='firstName' placeholder='First Name' />
                        <MyTextInput name='lastName' placeholder='Last Name' />
                        </Form.Group>
                        <Form.Group widths={2}> 
                        <MyTextInput name='gender' placeholder='Gender' />
                        <MyTextInput name='phone' placeholder='Phone' />
                        </Form.Group>
                        <Form.Group widths={3}> 
                        <MyTextInput name='email' placeholder='Email' />
                        <MyTextInput name='address' placeholder='Address' />
                        <MyTextInput name='about' placeholder='About' />
                        </Form.Group>
                        <Form.Group widths={2}>
                        <MyTextInput name='allergic' placeholder='Allergic' />
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