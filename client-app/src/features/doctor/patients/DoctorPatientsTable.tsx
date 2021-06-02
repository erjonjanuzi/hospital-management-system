import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AddNewPatient from './AddNewPatient';
import ViewPatient from './ViewPatient';

export default observer(function DoctorPatientsTable() {
    const { patientStore, modalStore } = useStore();
    const { patients, patientRegistry, loadPatients, deletePatient } = patientStore;

    useEffect(() => {
        if (patientRegistry.size <= 1) loadPatients();
    }, [patientRegistry.size, loadPatients])

    return (
        <Segment>
            <Button style={{ color: "black", backgroundColor: "#3BBCA6" }} content='Add new patient' onClick={() => modalStore.openModal(<AddNewPatient />)}/>
            <Header content='Patients under my supervision' />
            <Header sub content='All patients' />
            <Table textAlign="center">
                <Table.Header >
                    <Table.Row >
                        {/* <Table.HeaderCell>Username</Table.HeaderCell> */}
                        <Table.HeaderCell style={{ backgroundColor: "#3BBCA6" }}>First Name</Table.HeaderCell>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Last Name</Table.HeaderCell>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Age</Table.HeaderCell>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Email</Table.HeaderCell>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Registered Since</Table.HeaderCell>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Status</Table.HeaderCell>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {patients.map(patient => (
                        <Table.Row key={patient.id}>
                            <Table.Cell >{patient.firstName}</Table.Cell>
                            <Table.Cell>{patient.lastName}</Table.Cell>
                            <Table.Cell>{patient.age}</Table.Cell>
                            <Table.Cell>{patient.email}</Table.Cell>
                            <Table.Cell>{patient.registeredSince.split('T')[0]}</Table.Cell>
                            <Table.Cell>{patient.status}</Table.Cell>

                            <Table.Cell>
                                <Button content='Edit' icon='edit' basic color='youtube'
                                    onClick={() => modalStore.openModal(<ViewPatient id={patient.id} />)} />
                                <Button icon='delete' color='red'
                                    onClick={() => deletePatient(patient.id)}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>
    )
})