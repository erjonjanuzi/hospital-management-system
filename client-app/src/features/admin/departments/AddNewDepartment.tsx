import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, Message } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';

export default observer(function AddNewDepartment() {

    const{departmentStore,modalStore} = useStore();
    
    const selectedDeparment ={
        id :'',
        name : '',
        capacity:'',
        description:'',
        error : null
        
    }
    const validationSchema = Yup.object({
        name:Yup.string().required('Name is required'),
        capacity:Yup.string().required('Capacity is required'),
        description:Yup.string().required('Descritpion is required'),



    })

    return (

        <>
            <Header as='h1' content='Add Department' />
            <Divider />
            <Formik
                initialValues={selectedDeparment}
                onSubmit={(values, { setErrors }) => departmentStore.createDepartment(values).catch(error =>
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
                        <Header sub content='Details' />
                        <MyTextInput name='Name' placeholder='Name' />
                        <MyTextInput name='Capacity' placeholder='Capacity' />
                        <MyTextInput name='Descritpion' placeholder='Description' />
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