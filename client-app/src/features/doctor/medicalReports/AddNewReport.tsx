import { ErrorMessage, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, Form , Message , TextArea, Modal} from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';

interface Props {
    id: string
}

export default observer(function AddNewReport({ id }: Props){
    const{medicalReportStore,modalStore}=useStore();

    const selectedReport = {
        firstName : '',
        lastName : '',
        age : '',
        date: '',
        report : '',
        patientsId: id,
        error : null
    }
    const validationSchema = Yup.object({
        firstName:Yup.string().required('First Name is required'),
        lastName:Yup.string().required('Last Name is required'),
        date: Yup.date().required('Please pick a date'),
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
                        <Modal.Content> 

                        <MyTextInput name='firstName' placeholder='First Name' label="First Name:"/>
                        <MyTextInput name='lastName' placeholder='Last Name' label="Last Name:"/>
                        <Divider />

                        <MyTextInput name='age' placeholder='Age' label="Age:"/> 
                        <MyTextInput name='date' type='date' placeholder='Date' label="Date:" />

                        <Divider />

                        <MyTextInput name='report' placeholder='Report' label="Report:"/>

                        <Divider />
                        </Modal.Content>
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