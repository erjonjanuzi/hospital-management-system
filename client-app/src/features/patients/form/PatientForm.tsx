import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

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

    useEffect(() => {
        if (id) loadPatient(id).then(patient => setPatient(patient!))
    }, [id, loadPatient]);

    function handleSubmit() {
        if (patient.id.length === 0) {
            let newPatient = {
                ...patient,
                id: uuid()
            };
            createPatient(newPatient).then(() => history.push(`/patients`))
        } else {
            updatePatient(patient).then(() => history.push(`/patients/${patient.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setPatient({...patient, [name]: value})
    }

    //if (loadingInitial) return <LoadingComponent content='Loading patient...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='First Name' value={patient.firstName} name='firstName' onChange={handleInputChange} />
                <Form.Input placeholder='Last Name' value={patient.lastName} name='lastName' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/patients' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})