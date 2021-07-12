import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Grid, Header, Icon, Segment, Tab } from 'semantic-ui-react';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import { useStore } from '../../../app/stores/store';
import AccountsTable from './AccountsTable';
import ChooseAccountScreen from './ChooseAccountScreen';

export default observer(function AdminAccountsTable() {
    const { accountManagementStore, modalStore } = useStore();
    const { accountRegistry, loadAccounts } = accountManagementStore;

    useEffect(() => {
        if (accountRegistry.size <= 1) loadAccounts();
    }, [accountRegistry.size, loadAccounts])

    const panes = [
        {
            menuItem: { key: 'admins', content: 'Administrators' },
            render: () => <Tab.Pane><AccountsTable role={'admin'} /></Tab.Pane>,
        },
        {
            menuItem: { key: 'doctors', content: 'Doctors' },
            render: () => <Tab.Pane><AccountsTable role={'doctor'} /></Tab.Pane>,
        },
        {
            menuItem: { key: 'patients', content: 'Patients' },
            render: () => <Tab.Pane><AccountsTable role={'patient'} /></Tab.Pane>,
        },
    ]

    return (
        <>
            <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <Header as='h1' content='Users' />
                </Segment>
            </Segment.Group>
            <Grid>
                <Grid.Column width='12'>
                    <Tab panes={panes} />
                </Grid.Column>
                <Grid.Column width='4'>
                    <Segment textAlign='center'>
                        <Header as='h1' content='New User' />
                        <span>Add a new user account</span>
                        <br /><br />
                        <Icon name='user outline' size='massive' />
                        <br /><br />
                        <Button animated='vertical' color='teal' onClick={() => modalStore.openModal(<ChooseAccountScreen />)}>
                            <Button.Content visible>New User</Button.Content>
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
