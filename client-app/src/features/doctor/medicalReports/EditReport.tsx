import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Button, Divider, Form, Header, Message, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { values } from 'mobx';

interface Props {
    id: string | undefined;
}

export default observer(function EditReport({ id }: Props) {

    const {
        accountManagementStore: { loadAccount, selectedAccount },
        medicalReportStore: { loadReport, loadReportsByPatient, selectedReport, updateReport },
        modalStore
    } = useStore();

    const reports = selectedReport;

    const SelectedReport = {
        id: reports!.id,
        firstName: reports!.firstName,
        lastName: reports!.lastName,
        age: reports!.age,
        date: reports!.date,
        report: reports!.report,
        patientsId: reports!.patientsId,
        error: null
    }
    useEffect(() => {
        if (id) loadReport(id);
    }, [id, loadAccount]);

    return (
        <>
            <Header as='h2' content='You can update report here!' />
            <Divider />
            <Formik
                initialValues={SelectedReport}
                onSubmit={(values, { setErrors }) => updateReport(values).catch(error => setErrors({ error }))}
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

                        <MyTextInput name='firstName' placeholder='First Name' label="First Name:"/>
                        <MyTextInput name='lastName' placeholder='Last Name' label="Last Name:"/>
                        <Divider />

                        <MyTextInput name='age' placeholder='Age' label="Age:"/> 
                        <MyTextInput name='date' type='date' placeholder='Date' label="Date:" />

                        <Divider />

                        <MyTextInput name='report' placeholder='Report' label="Report:"/>

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
    );
})