import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, Message ,Dropdown} from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';

export default observer(function AddNewDonor() {

    const{bloodBankStore,modalStore} = useStore();
    
    const selectedBloodBank ={
       
        name : '',
        blood:'',
        age:'',
        email:'',
        mobile:'',
        error : null
        
    }

    const groups = [
        { key: 'A+', text: 'A+', value:'A+'  },
        { key: 'A-', text: 'A-', value: 'A-' },
        { key: 'B+', text: 'B+', value: 'B+' },
        { key: 'B-', text: 'B-', value: 'B-' },
        { key: 'AB+', text: 'AB+', value: 'AB+' },
        { key: 'AB-', text: 'AB-', value: 'AB-' },
        { key: '0+', text: '0+', value: '0+' },
        { key: '0-', text: '0-', value: '0-' },
      ]
      
    const validationSchema = Yup.object({
        name:Yup.string().required('Name is required'),
        blood:Yup.string().required('Blood Type is required'),
        age:Yup.string().required('Age is required'),

    })

    return (

        <>
            <Header as='h1' content='Add Donor' />
            <Divider />
            <Formik
                initialValues={selectedBloodBank}
                onSubmit={(values, { setErrors }) => bloodBankStore.createBloodBank(values).catch(error =>
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
                        <Header sub content='details' />
                        <MyTextInput name='name' placeholder='Name' />
                        <MySelectInput name='blood' placeholder='Blood Type' options={groups} />
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