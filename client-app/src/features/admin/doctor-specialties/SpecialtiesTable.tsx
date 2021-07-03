import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Confirm, Popup, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ViewSpecialty from './ViewSpecialty';

export default observer(function SpecialtiesTable() {
    const { specialtyStore: { loadSpecialties, specialties, specialtyRegistry, deleteSpecialty }, modalStore } = useStore();

    const [selectedId, setSelectedId] = useState("");
    const [openConfirm, setOpenConfirm] = useState(false);
    function open(id: string) {
        setSelectedId(id);
        setOpenConfirm(!openConfirm);
    }

    useEffect(() => {
        if (specialtyRegistry.size <= 1) loadSpecialties();
    }, [specialties, specialtyRegistry.size])

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Options</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {specialties.map(specialty => (
                    <>
                        <Table.Row key={specialty.id}>
                            <Table.Cell>{specialty.name}</Table.Cell>
                            <Table.Cell width='7'>
                                {specialty.description.length > 100 ? specialty.description.substring(0, 99) + '...' : specialty.description}
                            </Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Button content='View' color='facebook' onClick={() => modalStore.openModal(<ViewSpecialty id={specialty.id!} />)} />
                                <Popup content='Delete specialty' trigger={
                                    <Button
                                        icon='trash'
                                        color='red'
                                        content='Delete'
                                        onClick={() => open(specialty.id!)}
                                        basic
                                    />
                                } />
                            </Table.Cell>
                        </Table.Row>
                    </>
                ))}
            </Table.Body>
            <Confirm
                open={openConfirm}
                header='Delete specialty'
                content='This action cannot be undone. Are you sure?'
                cancelButton='Cancel'
                confirmButton="Delete"
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() => deleteSpecialty(selectedId).then(() => setOpenConfirm(false))}
            />
        </Table>
    )
})