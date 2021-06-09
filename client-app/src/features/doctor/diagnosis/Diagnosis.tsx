
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import Breadcrumbs from '../../patients/my-profile/Breadcrumbs';
import CreateDiagnosis from './CreateDiagnosis';
import ViewDiagnosis from './ViewDiagnosis';



export default observer(function Diagnosis() {

    const { patientStore, modalStore,  } = useStore();
    const { loadPatients, patients, patientRegistry } = patientStore;    

    const { diagnosisStore } = useStore();

    useEffect(() => {
        if (patientRegistry.size <= 1) loadPatients();
    }, [patientRegistry.size, loadPatients])

    return (
        <>
            <Breadcrumbs> </Breadcrumbs>
            <Segment>
                {/* <Button content='Create new user' onClick={() => modalStore.openModal(<RegisterNewUserForm />)}
            /> */}
                <Header content='Diagnosis Management' />
                <Header sub content='All patietns' />
                <Table textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Registered Since</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {patients.map(patient => (
                             
                            <Table.Row key={patient.id}>
                                <Table.Cell>{patient.firstName}</Table.Cell>
                                <Table.Cell>{patient.lastName}</Table.Cell>
                                <Table.Cell>{patient.email}</Table.Cell>
                                <Table.Cell>{patient.role}</Table.Cell>
                                <Table.Cell>{patient.registeredSince.split('T')[0]}</Table.Cell>
                                <Table.Cell>
                                    <Button 
                                        content='View Diagnosis' icon='edit' basic color='youtube'
                                        onClick={() => modalStore.openModal(<ViewDiagnosis id={patient.id} />)} />
                                    <Button 
                                        content='Add Diagnosis' icon='add' basic color='youtube'
                                        onClick={() => modalStore.openModal(<CreateDiagnosis id={patient.id} />)} />
                                    
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>
        </>
    )
});