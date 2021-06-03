import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../../app/stores/store';
import Breadcrumbs from '../../patients/my-profile/Breadcrumbs'
import { Button, Divider, Form, Header, Segment, Table } from 'semantic-ui-react';
import ViewDiagnosis from './ViewDiagnosis';



export default observer(function Diagnosis(): JSX.Element {

    const { patientStore, modalStore } = useStore();
    const { patients, loadPatients } = patientStore;
    loadPatients();

    return (
        <>
            <Breadcrumbs> </Breadcrumbs>
            <Segment>
                {/* <Button content='Create new user' onClick={() => modalStore.openModal(<RegisterNewUserForm />)}
            /> */}
                <Header content='Diagnosis Management' />
                <Header sub content='All patietnss' />
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
                                    <Button content='View Diagnosis' icon='edit' basic color='youtube'
                                        onClick={() => modalStore.openModal(<ViewDiagnosis id={patient.id} />)} />
                                    {/* id={patient.id}  */}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>
        </>
    )
});