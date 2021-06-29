import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import Breadcrumbs from '../../patients/my-profile/Breadcrumbs';
import CreateAnalysis from './CreateAnalysis';
import ViewAnalysis from './ViewAnalysis';


export default observer(function AnalysisTable() {

    const { patientStore, modalStore} = useStore();
    const { loadPatients, patients, patientRegistry } = patientStore;    

    const { analysisStore } = useStore();

    useEffect(() => {
        if (patientRegistry.size <= 1) loadPatients();
    }, [patientRegistry.size, loadPatients])


    return (
        <>
        <Breadcrumbs></Breadcrumbs>
        <Segment>
            <Header content='Analysis' />
            <Header sub content='All patients analysis' />
            <Table textAlign="center">
                <Table.Header >
                    <Table.Row >
                        <Table.HeaderCell style={{ backgroundColor: "#3BBCA6" }}>First Name</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#3BBCA6" }}>Last name</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#3BBCA6" }}>Email</Table.HeaderCell>
                            <Table.HeaderCell style={{ backgroundColor: "#3BBCA6" }}>Role</Table.HeaderCell>
                            <Table.HeaderCell style={{ backgroundColor: "#3BBCA6" }}>Registered Since</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#3BBCA6" }}>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {patients.map(patient => (
                        <Table.Row key={patient.id}>
                            <Table.Cell >{patient.firstName}</Table.Cell>
                            <Table.Cell>{patient.lastName}</Table.Cell>
                            <Table.Cell>{patient.email}</Table.Cell>
                                <Table.Cell>{patient.role}</Table.Cell>
                                <Table.Cell>{patient.registeredSince.split('T')[0]}</Table.Cell>
                            <Table.Cell>
                                      <Button content='View Analyse' icon='edit' basic color='youtube'
                                    onClick={() => modalStore.openModal(<ViewAnalysis id={patient.id}/>)} />                                    
                                <Button 
                                        content='Add Analysis' icon='add' basic color='youtube'
                                        onClick={() => modalStore.openModal(<CreateAnalysis id={patient.id} />)} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>
        </>

    )
});