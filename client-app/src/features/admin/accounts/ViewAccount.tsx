import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Divider, Header, Item, Modal } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
    id: string
}

export default observer(function ViewAccount({ id }: Props) {
    const { accountManagementStore: { loadAccount, selectedAccount: account }, modalStore } = useStore();

    useEffect(() => {
        if (id) loadAccount(id);
    }, [id, loadAccount]);

    return (
        <>
            <Header content='User Details' />
            <Divider />
            <Modal.Content>
                <Header as='h4' content={`First name: ${account?.firstName}`} />
                <Header sub content='Last name: ' />
                <Item content={account?.lastName} />
                <Header sub content='Email address:: ' />
                <Item content={account?.email} />
                <Header sub content='Role: ' />
                <Item content={account?.role} />
                <Header sub content='User since: ' />
                <Item content={account?.registeredSince} />
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' content='Cancel' onClick={modalStore.closeModal} />
                <Button
                    content="Edit"
                    labelPosition='right'
                    icon='checkmark'
                    positive
                />
            </Modal.Actions>
        </>
    )
})