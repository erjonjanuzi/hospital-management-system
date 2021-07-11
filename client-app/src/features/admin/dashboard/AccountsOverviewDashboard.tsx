import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Segment, Statistic } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function AccountsOverviewDashboard() {
    const { accountManagementStore: { accountRegistry, loadAccounts, accounts, numberOfAccounts } } = useStore();

    useEffect(() => {
        if (accountRegistry.size <= 1) loadAccounts()
    }, [accountRegistry.size, loadAccounts])

    return (
        <>
            <Segment textAlign='center'>
                <Statistic>
                    <Statistic.Value>{accounts.length}</Statistic.Value>
                    <Statistic.Label>Total accounts registered</Statistic.Label>
                </Statistic>
            </Segment>

            <Segment textAlign='center'>
                <Statistic>
                    <Statistic.Value>{numberOfAccounts('admin')}</Statistic.Value>
                    <Statistic.Label>Number of administrators</Statistic.Label>
                </Statistic>
            </Segment>

            <Segment textAlign='center'>
                <Statistic>
                    <Statistic.Value>{numberOfAccounts('patient')}</Statistic.Value>
                    <Statistic.Label>Registered patients</Statistic.Label>
                </Statistic>
            </Segment>

            <Segment textAlign='center'>
                <Statistic>
                    <Statistic.Value>{numberOfAccounts('doctor')}</Statistic.Value>
                    <Statistic.Label>Registered doctors</Statistic.Label>
                </Statistic>
            </Segment>
        </>
    )
})