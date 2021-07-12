import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Divider, Form, Header, Message, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';

interface Props {
    id: string | undefined;
}

export default observer(function EditDiagnosis({ id }: Props) {

    const {
        accountManagementStore: { loadAccount },
        diagnosisStore: { loadDiagnosis, selectedDiagnosis, updateDiagnosis },
        modalStore
    } = useStore();

    const Diagnosis = selectedDiagnosis;

    const SelectedDiagnosis = {
        id: Diagnosis!.id,
        title: Diagnosis!.title,
        type: Diagnosis!.type,
        stage: Diagnosis!.stage,
        details: Diagnosis!.details,
        date: Diagnosis!.date,
        patientsId: Diagnosis!.patientsId,
        error: null
    }
    useEffect(() => {
        if (id) loadDiagnosis(id);
    }, [id, loadAccount]);


    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        type: Yup.string().required('Type is required'),
        details: Yup.string().required('Valid details are required'),
        stage: Yup.string().required('Stage is required'),
        date: Yup.date().required('Please pick a date'),
    })

    return (
        <>
            <Header as='h1' content='Add a new Diagnosis' />
            <Divider />
            <Formik
                initialValues={SelectedDiagnosis}
                onSubmit={(values, { setErrors }) => updateDiagnosis(values).catch(error => setErrors({ error }))}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <ErrorMessage
                            name='error' render={() =>
                                <Message negative content={errors.error} />}
                        />
                        <Segment clearing>
                            <Modal.Content>
                                <Header sub content='Diagnosis information' />
                                <MyTextInput name='title' placeholder='Title' />
                                <MyTextInput name='type' placeholder='Type' />
                                <Divider />

                                <Header sub content='Details' />
                                <MyTextInput name='stage' placeholder='Stage' />
                                <MyTextInput name='details' placeholder='Details' />

                                <Divider />
                                <Header sub content='Date' />
                                <MyTextInput name='date' type='date' placeholder='Date' />
                                <Divider />
                            </Modal.Content>
                        </Segment>
                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} positive type='submit' content='Submit'
                        />
                        <Button basic color='red' content='Cancel' onClick={modalStore.closeModal} />
                    </Form>
                )}
            </Formik>
        </>
    );
})


