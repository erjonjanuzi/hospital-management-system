import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, Message } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';

export default observer(function AddNewDepartment() {

    const{departmentStore,modalStore} = useStore();
    
    const selectedDepartment ={
       
        name : '',
        capacity:'',
        description:'',
        error : null
        
    }
    const validationSchema = Yup.object({
        name:Yup.string().required('Name is required'),
    })

    return (

        <>
            <Header as='h1' content='Add Department' />
            <Divider />
            <Formik
                initialValues={selectedDepartment}
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
                        <Header sub content='details' />
                        <MyTextInput name='name' placeholder='Name' />
                        <MyTextInput name='capacity' placeholder='capacity' />

                        <MyTextInput name='description' placeholder='description' />

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