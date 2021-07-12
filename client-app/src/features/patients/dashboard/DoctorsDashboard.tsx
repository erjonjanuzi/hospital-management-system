import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';
import agent from '../../../app/api/agent';
import { DoctorProfile } from '../../../app/models/profile';
import { useStore } from '../../../app/stores/store';
import DoctorProfileCard from '../../admin/appointments/DoctorProfileCard';

export default observer(function AccountsTable() {
    const { accountManagementStore, modalStore } = useStore();
    const { accounts, accountRegistry, loadAccounts } = accountManagementStore;

    let count = 0;

    let doctor: DoctorProfile | undefined = undefined;
    let getDoctor = async (id: string) => {
        if (id) {
            doctor = await agent.AccountsManager.getDoctor(id);
        }
        if (doctor) modalStore.openModal(<DoctorProfileCard doctor={doctor} />)
    }

    useEffect(() => {
        if (accountRegistry.size <= 1) loadAccounts();
    }, [accountRegistry.size, loadAccounts])

    return (
        <>
            <Table textAlign="center" celled>
                <Table.Body>
                    {accounts.map(account =>
                        account.role === 'doctor' && count++ < 5 &&
                        (
                            <Table.Row key={account.id}>
                                <Table.Cell>{count}</Table.Cell>
                                <Table.Cell>{account.firstName + ' ' + account.lastName}</Table.Cell>
                                <Table.Cell>
                                    <Button icon='eye' basic color='youtube'
                                        onClick={() => getDoctor(account.id)} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </>
    )
})