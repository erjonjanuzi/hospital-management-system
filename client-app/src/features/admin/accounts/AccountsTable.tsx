import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';
import agent from '../../../app/api/agent';
import { DoctorProfile } from '../../../app/models/profile';
import { useStore } from '../../../app/stores/store';
import EditProfile from '../../doctor/profile/EditProfile';
import ViewAccount from './ViewAccount';

interface Props {
    role: string;
}

export default observer(function AccountsTable({ role }: Props) {
    const { accountManagementStore, modalStore } = useStore();
    const { accounts, accountRegistry, loadAccounts, deleteAccount } = accountManagementStore;

    let doctor: DoctorProfile | undefined = undefined;
    let getDoctor = async (id: string) => {
        if (id) {
            doctor = await agent.AccountsManager.getDoctor(id);
        }
        if (doctor) modalStore.openModal(<EditProfile doctor={doctor} />)
    }

    useEffect(() => {
        if (accountRegistry.size <= 1) loadAccounts();
    }, [accountRegistry.size, loadAccounts])

    return (
        <>
            <Table textAlign="center" celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Registered Since</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {accounts.map(account =>
                        account.role === role &&
                        (
                            <Table.Row key={account.id}>
                                <Table.Cell>{account.userName}</Table.Cell>
                                <Table.Cell>{account.firstName}</Table.Cell>
                                <Table.Cell>{account.lastName}</Table.Cell>
                                <Table.Cell>{account.email}</Table.Cell>
                                <Table.Cell>{account.registeredSince.split('T')[0]}</Table.Cell>
                                <Table.Cell>
                                    {role === 'doctor' ?
                                        <Button content='Edit profile' icon='edit' basic color='youtube'
                                            onClick={() => getDoctor(account.id)} /> :
                                        <Button content='Edit' icon='edit' basic color='youtube'
                                            onClick={() => modalStore.openModal(<ViewAccount id={account.id} />)} />
                                    }
                                    <Button icon='delete' color='red'
                                        onClick={() => deleteAccount(account.id)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </>
    )
})