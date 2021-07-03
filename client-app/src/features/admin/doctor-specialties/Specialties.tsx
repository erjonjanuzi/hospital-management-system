import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import { useStore } from '../../../app/stores/store';
import SpecialtiesTable from './SpecialtiesTable';
import SpecialtyForm from './SpecialtyForm';

export default observer(function Specialties() {
    const { modalStore } = useStore();

    return (
        <>
            <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <Header as='h1' content='Manage Doctor Specialties' />
                </Segment>
            </Segment.Group>
            <Grid>
                <Grid.Column width='11'>
                    <Segment>
                        <SpecialtiesTable />
                    </Segment>
                </Grid.Column>
                <Grid.Column width='5'>
                    <Segment textAlign='center'>
                        <Header as='h1' content='New Specialty' />
                        <span>Add a new doctor specialty to the list of doctor specialties to be used</span>
                        <br /><br />
                        <Icon name='plus' size='massive' />
                        <br /><br />
                        <Button animated='vertical' color='teal' onClick={() => modalStore.openModal(<SpecialtyForm />)}>
                            <Button.Content visible>New specialty</Button.Content>
                            <Button.Content hidden>
                                <Icon name='plus' />
                            </Button.Content>
                        </Button>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )
})