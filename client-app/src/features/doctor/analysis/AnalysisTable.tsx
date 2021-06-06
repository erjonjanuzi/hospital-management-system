import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import Breadcrumbs from '../../patients/my-profile/Breadcrumbs';
import ViewAnalysis from './ViewAnalysis';


export default observer(function AnalysisTable() {
    const { analysisStore, modalStore } = useStore();
    const { analysis, analyseRegistry, selectedAnalyse:  loadAnalyseP, loadAnalysis, deleteAnalyse, loadAnalyse } = analysisStore;

    useEffect(() => {
        if (analyseRegistry.size <= 1 ) loadAnalysis();
      }, [analyseRegistry.size, loadAnalysis])

    return (
        <Segment>

            {/* <Button onClick={() => modalStore.openModal(<AddNewAnalyse />)} style={{ color: "black", backgroundColor: "#3BBCA6" }} content='Add new patient' /> */}
            <Breadcrumbs></Breadcrumbs>
            <Header content='Analysis' />
            <Header sub content='All patients analysis' />
            <Table textAlign="center">
                <Table.Header >
                    <Table.Row >
                        {/* <Table.HeaderCell>Username</Table.HeaderCell> */}
                        <Table.HeaderCell style={{ backgroundColor: "#3BBCA6" }}>First Name</Table.HeaderCell>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Last name</Table.HeaderCell>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {analysis.map(patient => (
                        <Table.Row key={patient.id}>
                            <Table.Cell >{patient.patientFirstName}</Table.Cell>
                            <Table.Cell>{patient.patientLastName}</Table.Cell>
                            <Table.Cell>
                                      <Button content='Analyse' icon='edit' basic color='youtube'
                                    onClick={() => modalStore.openModal(<ViewAnalysis id={patient.id}/>)} />                                    
                                <Button icon='delete' color='red'id={patient.id}
                                    onClick={() => deleteAnalyse(patient.id)}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>
    )
})