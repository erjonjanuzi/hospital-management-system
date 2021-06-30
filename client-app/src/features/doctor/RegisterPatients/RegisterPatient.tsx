import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { Header,Divider, Form , Message, Button, Segment} from "semantic-ui-react";
import { ErrorMessage, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";



export default observer(function RegisterPatient(){
    const{registerPatientStore,modalStore} = useStore();
 
    const selectedPharmacy ={
        firstName : '',
        lastName : '',
        gender : '',
        phone : '',
        email : '',
        address : '',
        about : '',
        allergic : '',
        error : null,
    }

    const validationSchema = Yup.object({
        firstName:Yup.string().required('First Name is required'),
        lastName:Yup.string().required('Last Name is required'),
        gender:Yup.string().required('Gender is required'),
        phone:Yup.string().required('Phone is required')
    })

    return(
     <>
     <Segment>
            <Header as='h1' content='Register Patients' color='green' inverted />
            <Divider />
            <Formik
                initialValues={selectedPharmacy} 
                onSubmit={(values, { setErrors }) => registerPatientStore.registerPatient(values).catch(error =>
                setErrors({ error }))}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty,errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <ErrorMessage
                            name='error' render={() =>
                            <Message negative content={errors.error} />}
                        />
                        <Form.Group widths={2}>
                         <Form.Field><h5>First Name:</h5>
                          <MyTextInput name='firstName' placeholder='First Name' />
                          </Form.Field>
                          <Form.Field><h5>Last Name:</h5>
                          <MyTextInput name='lastName' placeholder='Last Name' />
                          </Form.Field>
                        </Form.Group>
                        <Form.Group widths={2}> 
                        <Form.Field><h5>Gender M/F:</h5>
                        <MyTextInput name='gender' placeholder='Gender' />
                        </Form.Field>
                        <Form.Field><h5>Phone:</h5>
                        <MyTextInput name='phone' placeholder='Phone' />
                        </Form.Field>
                        </Form.Group>
                        <Form.Group widths={3}> 
                        <Form.Field><h5>Email:</h5>
                        <MyTextInput name='email' placeholder='Email' />
                        </Form.Field>
                        <Form.Field><h5>Address:</h5>
                        <MyTextInput name='address' placeholder='Address' />
                        </Form.Field>
                        <Form.Field><h5>About:</h5>
                        <MyTextInput  name='about' placeholder='About' />
                        </Form.Field>
                        </Form.Group>
                        <Form.Group widths={3}>
                          <Form.Field><h5>Allergic ?</h5>
                          <MyTextInput name='allergic' placeholder='Allergic' />
                          </Form.Field>
                        </Form.Group>
                        <Divider />
                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} positive  type='submit' content='Register'
                        />
                    </Form>
                )}
                
            </Formik>
            </Segment>
     </>   
    )
})