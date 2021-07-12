import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Grid, Header, Icon, Menu, Segment, Tab, Table } from 'semantic-ui-react';
import agent from '../../../app/api/agent';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import { DoctorProfile } from '../../../app/models/profile';
import { useStore } from '../../../app/stores/store';
import EditProfile from '../../doctor/profile/EditProfile';
import ViewAccount from '../accounts/ViewAccount';

interface Props {
    role: string;
}

export default observer(function DashboardAccounts({ role }: Props) {
    const { accountManagementStore, modalStore } = useStore();
    const { accounts, accountRegistry, loadAccounts, numberOfAccounts } = accountManagementStore;

    let doctor: DoctorProfile | undefined = undefined;
    let getDoctor = async (id: string) => {
        if (id) {
            doctor = await agent.AccountsManager.getDoctor(id);
        }
        if (doctor) modalStore.openModal(<EditProfile doctor={doctor} />)
    }

    let count = 0;

    useEffect(() => {
        if (accountRegistry.size <= 1) loadAccounts();
    }, [accountRegistry.size, loadAccounts])

    return (
        <>
            {numberOfAccounts(role) > 0 ?
                <Segment>
                    <Header as='h2' content={`${role}s`}
                        icon={role === 'doctor' ? 'user doctor' : 'user'} />
                    <Table textAlign="center" celled color='teal'>
                        <Table.Body>
                            {accounts.map(account =>
                                account.role === role && count++ < 3 &&
                                (
                                    <Table.Row key={account.id}>
                                        <Table.Cell>{count}</Table.Cell>
                                        <Table.Cell>{account.firstName}</Table.Cell>
                                        <Table.Cell>{account.lastName}</Table.Cell>
                                        <Table.Cell>{account.email}</Table.Cell>
                                        <Table.Cell>
                                            {role === 'doctor' ?
                                                <Button icon='edit' basic color='facebook'
                                                    onClick={() => getDoctor(account.id)} /> :
                                                <Button icon='edit' basic color='youtube'
                                                    onClick={() => modalStore.openModal(<ViewAccount id={account.id} />)} />
                                            }
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    </Table>
                </Segment>
                : <Segment>
                    <Header as='h2' content={`${role}s`}
                        icon={role === 'doctor' ? 'user doctor' : 'user'} />
                    <Header icon style={{ margin: '50px 0' }} textAlign='center'>
                        <Icon name='x' color='red' />
                        There are currently no {role}s registered
                    </Header>
                </Segment>
            }
        </>
    )
})