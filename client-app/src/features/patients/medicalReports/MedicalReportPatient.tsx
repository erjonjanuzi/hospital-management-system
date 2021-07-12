import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import Breadcrumbs from '../../patients/my-profile/Breadcrumbs';
import ViewReport from './ViewReport';


export default observer(function MedicalReportPatient() {


    const { patientStore, modalStore } = useStore();
    const { loadPatients, patients, patientRegistry } = patientStore;

    useEffect(() => {
        if (patientRegistry.size <= 1) loadPatients();
    }, [patientRegistry.size, loadPatients])


    return (
        <>
            <Breadcrumbs> </Breadcrumbs>
            <Segment>
                <Header content='Medical Reports' />

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
                                    <Button content='View My Report' icon='eye' basic color='youtube'
                                        onClick={() => modalStore.openModal(<ViewReport id={patient.id} />)}
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