import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Container, Button, Form, Segment, Header, Table } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import Breadcrumbs from "../my-profile/Breadcrumbs";
import CreateOtherVc from "./CreateOtherVc";
import ViewVaccine from "./ViewVaccine";


export default observer(function OtherVaccination() {

    const { otherVaccsStore, modalStore} = useStore();
    const { loadDiffVaccines, other, vaccRegistry, deleteDiffVaccine } = otherVaccsStore;   

    useEffect(() => {
        if (vaccRegistry.size <= 1) loadDiffVaccines();
    }, [vaccRegistry.size, loadDiffVaccines])

    return (
        <>
        <Segment>
        <Button 
        content='Get Vaccinated' icon='add' basic color='red'
        onClick={() => modalStore.openModal(<CreateOtherVc/>)} 
        />
            <Table textAlign="center">
                <Table.Header >
                    <Table.Row >
                        <Table.HeaderCell >First Name</Table.HeaderCell>
                        <Table.HeaderCell >Last name</Table.HeaderCell>
                        <Table.HeaderCell >Vaccine</Table.HeaderCell>
                        <Table.HeaderCell >Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {other.map(other => (
                        <Table.Row key={other.id}>
                            <Table.Cell >{other.firstName}</Table.Cell>
                            <Table.Cell>{other.lastName}</Table.Cell>
                            <Table.Cell>{other.vaccineType}</Table.Cell>
                            <Table.Cell>
                                      <Button content='View' basic color='youtube'
                                    onClick={() => modalStore.openModal(<ViewVaccine id={other.id} />)} 
                                    />                                  
                                <Button 
                                        content='Delete' icon='delete' basic color='red'
                                        onClick={() => deleteDiffVaccine(other.id)}
                                        />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>
        </>

    )

});