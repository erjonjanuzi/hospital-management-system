import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import RegisterDoctorForm from './RegisterDoctorForm';
import RegisterNewUserForm from './RegisterNewUserForm';

export default observer( function ChooseAccountScreen() {
    const { modalStore } = useStore();

    return (
        <>
            <Header as='h1' content='Choose account role' textAlign='center' />
            <Grid textAlign='center'>
                <Grid.Column width='5'>
                    <Segment textAlign='center'>
                        <Header as='h3' content='Administrator' />
                        <Icon name='user' size='massive' />
                        <br /><br />
                        <Button animated='vertical' color='teal' onClick={() => modalStore.openModal(<RegisterNewUserForm />)}>
                            <Button.Content visible>New Administrator</Button.Content>
                            <Button.Content hidden>
                                <Icon name='plus' />
                            </Button.Content>
                        </Button>
                    </Segment>
                </Grid.Column>
                <Grid.Column width='5'>
                <Segment textAlign='center'>
                        <Header as='h3' content='Doctor' />
                        <Icon name='user doctor' size='massive' />
                        <br /><br />
                        <Button animated='vertical' color='teal' onClick={() => modalStore.openModal(<RegisterDoctorForm />)}>
                            <Button.Content visible>New Doctor</Button.Content>
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