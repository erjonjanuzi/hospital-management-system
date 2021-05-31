import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import RegisterNewUserForm from './RegisterNewUserForm';
import ViewAccount from './ViewAccount';

export default observer(function AdminAccountsTable() {
    const { accountManagementStore, modalStore } = useStore();
    const { accounts, accountRegistry, loadAccounts, deleteAccount } = accountManagementStore;

    useEffect(() => {
        if (accountRegistry.size <= 1) loadAccounts();
    }, [accountRegistry.size, loadAccounts])

    return (
        <Segment>
            <Button content='Create new user' onClick={() => modalStore.openModal(<RegisterNewUserForm />)}/>
            <Header content='Account Management' />
            <Header sub content='All accounts' />
            <Table textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Role</Table.HeaderCell>
                        <Table.HeaderCell>Registered Since</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {accounts.map(account => (
                        <Table.Row key={account.id}>
                            <Table.Cell>{account.userName}</Table.Cell>
                            <Table.Cell>{account.firstName}</Table.Cell>
                            <Table.Cell>{account.lastName}</Table.Cell>
                            <Table.Cell>{account.email}</Table.Cell>
                            <Table.Cell>{account.role}</Table.Cell>
                            <Table.Cell>{account.registeredSince.split('T')[0]}</Table.Cell>
                            <Table.Cell>
                                <Button content='Edit' icon='edit' basic color='youtube'
                                    onClick={() => modalStore.openModal(<ViewAccount id={account.id} />)} />
                                <Button icon='delete' color='red'
                                    onClick={() => deleteAccount(account.id)}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>
    )
})