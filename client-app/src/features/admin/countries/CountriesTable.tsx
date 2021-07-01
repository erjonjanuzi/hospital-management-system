import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Confirm, Popup, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ViewCountry from './ViewCountry';

export default observer(function CountriesTable() {
    const { countriesStore, modalStore } = useStore();
    const { countries, countriesRegistry, loadCountries, deleteCountry } = countriesStore;

    const [selectedId, setSelectedId] = useState("");
    const [openConfirm, setOpenConfirm] = useState(false);
    function open(id: string) {
        setSelectedId(id);
        setOpenConfirm(!openConfirm);
    }

    useEffect(() => {
        if (countriesRegistry.size <= 1) loadCountries();
    }, [countries, countriesRegistry.size])

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Country Abbreviation</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Options</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {countries.map(country => (
                    <>
                        <Table.Row key={country.id}>
                            <Table.Cell>{country.id}</Table.Cell>
                            <Table.Cell>{country.name}</Table.Cell>
                            <Table.Cell>
                                <Button content='View' color='facebook' onClick={() => modalStore.openModal(<ViewCountry id={country.id} />)} />
                                <Popup content='Delete country' trigger={
                                    <Button
                                        icon='trash'
                                        color='red'
                                        content='Delete'
                                        onClick={() => open(country.id)}
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
                header='Delete country'
                content='This action cannot be undone. Are you sure?'
                cancelButton='Cancel'
                confirmButton="Delete"
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() => deleteCountry(selectedId).then(() => setOpenConfirm(false))}
            />
        </Table>
    )
})