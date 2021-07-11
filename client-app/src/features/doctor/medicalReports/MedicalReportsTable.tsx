import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import React, { useEffect } from 'react';
import AddNewReport from './AddNewReport';
import ViewReport from './ViewReport';
import medicalReportStore from '../../../app/stores/medicalReportStore';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';


export default observer(function MedicalReportsTable() {


    const { patientStore, modalStore } = useStore();
    const { loadPatients, patients, patientRegistry } = patientStore;

    useEffect(() => {
        if (patientRegistry.size <= 1) loadPatients();
    }, [patientRegistry.size, loadPatients])


    return (
        <>
            <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <Header as='h1' content='Medical Reports' />
                </Segment>
            </Segment.Group>
            <Segment>
                <Table textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>First Name</Table.HeaderCell>
                            <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Last Name</Table.HeaderCell>
                            <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Email</Table.HeaderCell>
                            <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Role</Table.HeaderCell>
                            <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Registered Since</Table.HeaderCell>
                            <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Actions</Table.HeaderCell>
                        </Table.Row>

                    </Table.Header>
                    <Table.Body >
                        {patients.map(patient => (
                            <Table.Row key={patient.id}>
                                <Table.Cell>{patient.firstName}</Table.Cell>
                                <Table.Cell>{patient.lastName}</Table.Cell>
                                <Table.Cell>{patient.email}</Table.Cell>
                                <Table.Cell>{patient.role}</Table.Cell>
                                <Table.Cell>{patient.registeredSince.split('T')[0]}</Table.Cell>
                                <Table.Cell>
                                    <Button content='View Report' icon='edit' basic color='youtube'
                                        onClick={() => modalStore.openModal(<ViewReport id={patient.id} />)}
                                    />
                                    <Button content='Add Report' icon='add' basic color='youtube'
                                        onClick={() => modalStore.openModal(<AddNewReport id={patient.id} />)}
                                    />
                                </Table.Cell>
                                <Table.Row />
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>
        </>
    )
})