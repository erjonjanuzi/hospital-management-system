import { ErrorMessage, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, Form , Message , TextArea} from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';


export default observer(function AddNewReport(){
    const{medicalReportStore,modalStore}=useStore();

    const selectedReport = {
        firstName : '',
        lastName : '',
        age : '',
        report : '',
        error : null
    }
    const validationSchema = Yup.object({
        firstName:Yup.string().required('First Name is required'),
        lastName:Yup.string().required('Last Name is required')
    })


    return(
        <>
        <Header as='h1' content='Add Report' />
            <Divider />
            <Formik
                initialValues={selectedReport}
                onSubmit={(values, { setErrors }) => medicalReportStore.createReport(values).catch(error =>
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
                        <Form.Group widths='equal'>
                        <MyTextInput name='firstName' placeholder='First Name' />
                        <MyTextInput name='lastName' placeholder='Last Name' />
                        <MyTextInput name='age' placeholder='Age' />
                        </Form.Group>
                        <Form.Group widths='equal'>
                        <MyTextInput name='report' placeholder='Report' />
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