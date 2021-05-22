import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { Patient } from '../../../app/models/patient';

export default observer(function PatientForm() {
    const history = useHistory();
    const {patientStore} = useStore();
    const {createPatient, updatePatient, loading, loadingInitial, loadPatient} = patientStore;
    const {id} = useParams<{id: string}>();

    const [patient, setPatient] = useState({
        id: '',
        firstName: '',
        lastName: ''
    });

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Emri eshte i detyreueshem'),
        lastName: Yup.string().required('Last name is qureised')
    })

    useEffect(() => {
        if (id) loadPatient(id).then(patient => setPatient(patient!))
    }, [id, loadPatient]);

    function handleFormSubmit(patient: Patient) {
        if (patient.id.length === 0) {
            let newPatient = {
                ...patient,
                id: uuid()
            };
            createPatient(newPatient).then(() => history.push(`/patients/${newPatient.id}`))
        } else {
            updatePatient(patient).then(() => history.push(`/patients/${patient.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading patient...' />

    return (
        <Segment clearing>
            <Header content='Patient Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={patient} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='firstName' placeholder='First name' />
                        <MyTextInput name='lastName' placeholder='Last name' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' 
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/patients' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})