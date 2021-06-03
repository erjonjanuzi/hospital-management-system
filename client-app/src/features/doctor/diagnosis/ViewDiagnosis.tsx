import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Button, Container, Divider, Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
    id: string
}

export default observer(function ViewDiagnosis({ id }: Props) {

    const Diagnosis = {
        // personal information

        title: "Hypertension",
        type: "1",
        diagnoseDate: "06/07/2021",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",

    }

    const { accountManagementStore: { loadAccount, selectedAccount, update }, modalStore } = useStore();

    useEffect(() => {
        if (id) loadAccount(id);
    }, [id, loadAccount]);

    return (
        <>
            <div>
                <Container textAlign='center'>Diagnosis</Container>
                <Container textAlign='justified'>
                    <b>{Diagnosis.title}</b>
                    <Divider />
                    <Header sub>Details</Header>
                    <span>{Diagnosis.details}</span>
                    <Header sub>Type</Header>
                    <span>{Diagnosis.type}</span>
                    <Header sub>Diagnosis Date</Header>
                    <span>{Diagnosis.diagnoseDate}</span>

                    <Divider hidden/>
                    <div>
                        <Button color='green' content=' Edit ' icon='edit' labelPosition='left' />
                        <Button color='red' content='Delete' icon='delete' labelPosition='right' />
                    </div>

                </Container>
            </div>
        </>
    )
})