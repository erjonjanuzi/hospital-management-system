import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import React, { useEffect } from 'react';
import AddNewReport from './AddNewReport';
import ViewReport from './ViewReport';

export default observer(function MedicalReportsTable(){

    const{medicalReportStore,modalStore} = useStore();
    const{reports,reportRegistry,loadReports,deleteReport} = medicalReportStore;

    useEffect(() => {
        if(reportRegistry.size<=0)loadReports();
    } ,[reportRegistry.size,loadReports])


    return(
        <>
        <Segment>
            <Button style={{ color: "black", backgroundColor: "#3BBCA6" }}  content='New Reports' onClick={() => modalStore.openModal(<AddNewReport/>)}/>
            <Header content='Medical Reports' />
          
            <Table textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>First Name</Table.HeaderCell>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Last Name</Table.HeaderCell>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Age</Table.HeaderCell>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Date</Table.HeaderCell>
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Medical Reports</Table.HeaderCell>                        
                        <Table.HeaderCell style={{ color: "black", backgroundColor: "#3BBCA6" }}>Actions</Table.HeaderCell>
                    </Table.Row>
                    
                </Table.Header> 
                <Table.Body >
                    {reports.map(report=>(
                                <Table.Row key={report.id}>
                                    <Table.Cell>{report.firstName}</Table.Cell>
                                    <Table.Cell>{report.lastName}</Table.Cell>
                                    <Table.Cell>{report.age}</Table.Cell>
                                    <Table.Cell>{report.registeredSince.split('T')[0]}</Table.Cell>
                                    <Table.Cell>{report.report}</Table.Cell>
                                    <Table.Cell>
                                    <Button content='Edit' icon='edit' basic color='youtube'
                                    onClick={() => modalStore.openModal(<ViewReport id={report.id}/>)}
                                    />
                                    <Button icon='delete' color='red'
                                     onClick={()=>deleteReport(report.id)}
                                    /> 
                                    </Table.Cell> 
                                <Table.Row/>  
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>
        </>
    ) 
})