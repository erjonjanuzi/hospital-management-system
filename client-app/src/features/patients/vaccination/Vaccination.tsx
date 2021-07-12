import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Segment, Table } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CreateVaccination from "./CreateVaccination";
import ViewVaccine from "./ViewVaccine";


export default observer(function Vaccination() {

    const { vaccinationStore, modalStore } = useStore();
    const { loadVaccines, vaccine, vaccineRegistry, deleteVaccine } = vaccinationStore;

    useEffect(() => {
        if (vaccineRegistry.size <= 1) loadVaccines();
    }, [vaccineRegistry.size, loadVaccines])

    return (
        <>
            <Segment>
                <Button
                    content='COVID-19 Vaccination' icon='add' color='red'
                    onClick={() => modalStore.openModal(<CreateVaccination />)}
                />

                <Table textAlign="center">
                    <Table.Header >
                        <Table.Row >
                            <Table.HeaderCell >First Name</Table.HeaderCell>
                            <Table.HeaderCell >Last name</Table.HeaderCell>
                            <Table.HeaderCell >Age</Table.HeaderCell>
                            <Table.HeaderCell >Vaccine</Table.HeaderCell>
                            <Table.HeaderCell >Date</Table.HeaderCell>
                            <Table.HeaderCell >Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {vaccine.map(vaccine => (
                            <Table.Row key={vaccine.id}>
                                <Table.Cell >{vaccine.firstName}</Table.Cell>
                                <Table.Cell>{vaccine.lastName}</Table.Cell>
                                <Table.Cell>{vaccine.age}</Table.Cell>
                                <Table.Cell>{vaccine.vaccine}</Table.Cell>
                                <Table.Cell>{vaccine.date.split('T')[0]}</Table.Cell>
                                <Table.Cell>
                                    <Button content='View' basic color='youtube'
                                        onClick={() => modalStore.openModal(<ViewVaccine id={vaccine.id} />)}
                                    />
                                    <Button
                                        content='Delete' icon='delete' basic color='red'
                                        onClick={() => deleteVaccine(vaccine.id)}
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