import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AddNewDepartment from './AddNewDepartment';
import React, { useEffect } from 'react';
import ViewDepartment from './ViewDepartment';

export default observer(function DepartmentsPage(){
    const {departmentStore,modalStore}=useStore();
    const {departments,departmentRegistry,loadDepartments,deleteDepartment} = departmentStore

    
   useEffect(() => {
       if(departmentRegistry.size<=0)loadDepartments();
   } ,[departmentRegistry.size,loadDepartments])
    
    return (
        <Segment>
            <Button content='Add New Department' onClick={() => modalStore.openModal(<AddNewDepartment/>)}/>
            <Header content='Departments' />
          
            <Table textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Department Name</Table.HeaderCell>
                        <Table.HeaderCell>Capacity</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                    
                </Table.Header> 
                <Table.Body >
                    {departments.map(department=>(
                                <Table.Row key={department.id}>
                                    <Table.Cell>{department.name}</Table.Cell>
                                    <Table.Cell>{department.capacity}</Table.Cell>
                                    <Table.Cell>{department.description}</Table.Cell>

                                    <Table.Cell>
                                    <Button content='Edit' icon='edit' basic color='youtube'
                                    onClick={() => modalStore.openModal(<ViewDepartment id={department.id}/>)}
                                    />
                                    <Button icon='delete' color='red'
                                     onClick={()=>deleteDepartment(department.id)}
                                    /> 
                                    </Table.Cell> 
                                <Table.Row/>  
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>
    )
})