import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AddNewCityForm from './AddNewCityForm';
import React, { useEffect } from 'react';
import ViewCityPage from './ViewCityPage';

export default observer(function CityTable(){
    const {cityStore,modalStore}=useStore();
    const {citys,cityRegistry,loadCities,deleteCity} = cityStore

    
   useEffect(() => {
       if(cityRegistry.size <= 1)loadCities();
   } ,[cityRegistry.size,loadCities])  
    
    return (
        <Segment>
            <Button content='Add city' onClick={() => modalStore.openModal(<AddNewCityForm/>)}/>
            <Header content='City Management' />
            <Header sub content='All cities' />
            <Table textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>City Id</Table.HeaderCell>
                        <Table.HeaderCell>City Name</Table.HeaderCell>
                        <Table.HeaderCell>Edit / Delete</Table.HeaderCell>
                    </Table.Row>
                    
                </Table.Header> 
                <Table.Body >
                    {citys.map(city=>(
                                <Table.Row key={city.id}>
                                    <Table.Cell>{city.id}</Table.Cell> 
                                    <Table.Cell>{city.name}</Table.Cell>
                                    <Table.Cell>
                                    <Button content='Edit' icon='edit' basic color='youtube'
                                    onClick={() => modalStore.openModal(<ViewCityPage name={city.id}/>)}
                                    />
                                    <Button icon='delete' color='red'
                                     onClick={()=>deleteCity(city.id)}
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