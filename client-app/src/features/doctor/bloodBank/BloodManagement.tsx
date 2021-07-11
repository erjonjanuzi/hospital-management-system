import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AddNewDonor from './AddNewDonor';
import React, { useEffect } from 'react';
import ViewDonor from './ViewDonor';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';

export default observer(function BloodManagment(){
    const {bloodBankStore,modalStore}=useStore();
    const {bloodBanks,bloodBankRegistry,loadBloodBanks,deleteBloodBank} = bloodBankStore

    
   useEffect(() => {
       if(bloodBankRegistry.size<=0)loadBloodBanks();
   } ,[bloodBankRegistry.size,loadBloodBanks])
    
    return (
        <>
        <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <Header as='h1' content='Blood bank management' />
                </Segment>
            </Segment.Group>
        <Segment>
            <Button content='New Donor' onClick={() => modalStore.openModal(<AddNewDonor/>)}/>
            <Header content='Donors' />
          
            <Table textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Full Name</Table.HeaderCell>
                        <Table.HeaderCell>Blood Type</Table.HeaderCell>
                        <Table.HeaderCell>Age</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Mobile</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                    
                </Table.Header> 
                <Table.Body >
                    {bloodBanks.map(bloodBank=>(
                                <Table.Row key={bloodBank.id}>
                                    <Table.Cell>{bloodBank.name}</Table.Cell>
                                    <Table.Cell>{bloodBank.blood}</Table.Cell>
                                    <Table.Cell>{bloodBank.age}</Table.Cell>
                                    <Table.Cell>{bloodBank.email}</Table.Cell>
                                    <Table.Cell>{bloodBank.mobile}</Table.Cell>

                                    <Table.Cell>
                                    <Button content='Edit' icon='edit' basic color='youtube'
                                    onClick={() => modalStore.openModal(<ViewDonor id={bloodBank.id}/>)}
                                    />
                                    <Button icon='delete' color='red'
                                     onClick={()=>deleteBloodBank(bloodBank.id)}
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