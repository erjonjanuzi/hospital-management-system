import { ErrorMessage, Formik } from 'formik';
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Button, Container, Divider, Form, Header, Message, Modal, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { getuid } from 'process';

interface Props {
    id: string
}

export default observer(function CreateDiagnosis({ id }: Props) {

    const { diagnosisStore, modalStore } = useStore();
    const { } = diagnosisStore;

    const selectedDiagnosis = {
        title: '',
        type: '',
        stage: '',
        details: '',
        date: '',
        patientsId: id,
        error: null
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('Titele is required'),
        type: Yup.string().required('Type is required'),
        details: Yup.string().required('Valid details are required'),
        stage: Yup.string().required('Stage is required'),
        date: Yup.date().required('Please pick a date'),
    })

    return (
        <>
            <Header as='h1' content={id} />
            <Divider />
            <Formik
                initialValues={selectedDiagnosis}
                onSubmit={(values, { setErrors }) => diagnosisStore.createDiagnosis(values).catch(error =>
                    setErrors({ error }))} 
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
                        <Header sub content='Personal details' />
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextInput name='type' placeholder='Type' />
                        <Divider />
                        <Header sub content='Login credentials' />
                        <MyTextInput name='stage' placeholder='Stage' />
                        <MyTextInput name='details' placeholder='Details' />
                        <MyTextInput name='date' type='date' placeholder='Date' />
                        <Divider />
                        </Modal.Content>
                        </Segment>
                        <Button disabled={isSubmitting || !dirty || !isValid  }
                         loading={isSubmitting} positive type='submit' content='Submit'
                        />
                        <Button basic color='red' content='Cancel' onClick={modalStore.closeModal} />
                    </Form>
                )}
            </Formik>
        </>
    )
})