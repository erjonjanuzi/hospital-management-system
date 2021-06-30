import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import { useStore } from '../../../app/stores/store';
import CountriesTable from './CountriesTable';
import NationalitiesTable from './NationalitiesTable';
import RegisterCountryForm from './RegisterCountryForm';

export default observer(function Countries() {
    const { modalStore } = useStore();

    return (
        <>
            <Segment>
                <Breadcrumbs />
            </Segment>
            <Segment>
                <Grid divided>
                    <Grid.Column width='8'>
                        <Header as='h1' content='Countries & Cities' />
                        <Button content='Add new country' icon='plus' positive
                            onClick={() => modalStore.openModal(<RegisterCountryForm />)} fluid />
                        <CountriesTable />
                    </Grid.Column>
                    <Grid.Column width='8'>
                        <Header as='h1' content='Nationalities' />
                        <Button content='Add new nationality' icon='plus' positive fluid />
                        <NationalitiesTable />
                    </Grid.Column>
                </Grid>
            </Segment>
        </>
    )
})