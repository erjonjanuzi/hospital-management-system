import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Confirm, Popup, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ViewNationality from './ViewNationality';

export default observer(function NationalitiesTable() {
    const { nationalitiesStore, modalStore } = useStore();
    const { nationalities, nationalitiesRegistry, loadNationalities, deleteNationality } = nationalitiesStore;

    const [selectedId, setSelectedId] = useState("");
    const [openConfirm, setOpenConfirm] = useState(false);
    function open(id: string) {
        setSelectedId(id);
        setOpenConfirm(!openConfirm);
    }

    useEffect(() => {
        if (nationalitiesRegistry.size <= 1) loadNationalities();
    }, [nationalities, nationalitiesRegistry.size])

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nationality</Table.HeaderCell>
                    <Table.HeaderCell>Options</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {nationalities.map(nationality => (
                    <>
                        <Table.Row key={nationality.id}>
                            <Table.Cell>{nationality.name}</Table.Cell>
                            <Table.Cell>
                                <Button content='View' color='facebook'
                                    onClick={() => modalStore.openModal(<ViewNationality id={nationality.id!} />)} />
                                <Popup content='Delete nationality' trigger={
                                    <Button
                                        icon='trash'
                                        color='red'
                                        content='Delete'
                                        onClick={() => open(nationality.id!)}
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
                header='Delete nationality'
                content='This action cannot be undone. Are you sure?'
                cancelButton='Cancel'
                confirmButton="Delete"
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() => deleteNationality(selectedId).then(() => setOpenConfirm(false))}
            />
        </Table>
    )
})