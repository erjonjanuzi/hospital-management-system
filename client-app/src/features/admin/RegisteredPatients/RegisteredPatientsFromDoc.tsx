import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import Breadcrumbs from "../../../app/layout/Breadcrumbs";
import { useStore } from "../../../app/stores/store";
import EditRegistredPatients from "./EditRegistredPatients";


export default observer(function RegisteredPatientsFromDoc() {

    const { registerPatientStore, modalStore } = useStore();
    const { registeredPatients, patientRegistry, loadRegisteredPatients, deleteRegisteredPatient } = registerPatientStore;

    useEffect(() => {
        if (patientRegistry.size <= 1) loadRegisteredPatients();
    }, [patientRegistry.size, loadRegisteredPatients])


    return (
        <>
            <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <Header as='h1' content='Registered Patients' />
                </Segment>
            </Segment.Group>
            <Segment>
                <Table textAlign="center" color='green'>
                    <Table.Header >
                        <Table.Row>
                            <Table.HeaderCell>First Name <Icon name='angle down' /></Table.HeaderCell>
                            <Table.HeaderCell>Last Code <Icon name='angle down' /></Table.HeaderCell>
                            <Table.HeaderCell>Gender <Icon name='angle down' /></Table.HeaderCell>
                            <Table.HeaderCell>Phone <Icon name='angle down' /></Table.HeaderCell>
                            <Table.HeaderCell>Email <Icon name='angle down' /></Table.HeaderCell>
                            <Table.HeaderCell>Address <Icon name='angle down' /></Table.HeaderCell>
                            <Table.HeaderCell>About <Icon name='angle down' /></Table.HeaderCell>
                            <Table.HeaderCell>Allergic <Icon name='angle down' /></Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {registeredPatients.map(patients => (
                            <Table.Row key={patients.id}>
                                <Table.Cell>{patients.firstName}</Table.Cell>
                                <Table.Cell>{patients.lastName}</Table.Cell>
                                <Table.Cell>{patients.gender}</Table.Cell>
                                <Table.Cell>{patients.phone}</Table.Cell>
                                <Table.Cell>{patients.email}</Table.Cell>
                                <Table.Cell>{patients.address}</Table.Cell>
                                <Table.Cell>{patients.about}</Table.Cell>
                                <Table.Cell>{patients.allergic}</Table.Cell>
                                <Table.Cell>
                                    <Button content='Edit' icon='edit' basic color='youtube'
                                        onClick={() => modalStore.openModal(<EditRegistredPatients id={patients.id} />)}
                                    />
                                    <Button inverted icon='delete' color='red'
                                        onClick={() => deleteRegisteredPatient(patients.id)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>
        </>
    )
})
