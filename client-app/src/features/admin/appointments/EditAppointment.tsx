import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AdminViewAppointment from './AdminViewAppointment';

interface Props {
    id: string;
}

export default observer( function EditAppointment({id}: Props){
    const { modalStore, appointmentsStore: { loadAppointment, selectedAppointment, assignDoctor,
        denyAppointment }, accountManagementStore } = useStore();


    return (
        <>
        <h1>Edit appointment</h1>
        <Button content='Cancel' onClick={() => modalStore.openModal(<AdminViewAppointment id={selectedAppointment?.id!} />)}/>
        </>
    )
})