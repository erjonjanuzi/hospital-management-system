import { observer } from 'mobx-react-lite';
import { Table, Button, Segment, Label, Item, Icon, Header, Popup, Confirm } from "semantic-ui-react";
import React from 'react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AdminViewAppointment from './AdminViewAppointment';

export default observer(function RequestedAppointments() {
    const { appointmentsStore, modalStore } = useStore();
    const { loadAppointments, appointmentRegistry, appointments, deleteAppointment } = appointmentsStore;
    const [openConfirm, setOpenConfirm] = useState(false);

    function open() {
        setOpenConfirm(!openConfirm);
    }

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadAppointments();
    }, [appointmentRegistry.size, loadAppointments])

    return (
        <>
            {appointmentsStore.numberOfPendingAppointments > 0 ? 
            appointments.map(appointment => (
                appointment.status === 'Pending' &&
                    <Segment.Group>
                        <Segment>
                            <span>
                                <Header content='Patient' />
                                {appointment.patient ? appointment.patient.firstName + ' ' + appointment.patient.lastName
                                    : 'No longer exists'}
                            </span>
                        </Segment>
                        <Segment>
                            <span>
                                <Header content='Date and time' />
                                <Icon name='calendar' color='teal' />{appointment.date.toString().split('T')[0]}
                                <Icon name='clock' color='teal' />{appointment.date.toString().split('T')[1]}
                            </span>
                        </Segment>
                        <Segment clearing>
                            <Popup content='Details of this appointment' trigger={
                                <Button
                                    color='teal'
                                    content='View'
                                    onClick={() => modalStore.openModal(<AdminViewAppointment id={appointment.id!} />)}
                                />}
                            />
                            <Button animated='vertical' color='red' onClick={open}>
                                <Button.Content hidden>Delete</Button.Content>
                                <Button.Content visible>
                                    <Icon name='trash' />
                                </Button.Content>
                            </Button>
                        </Segment>
                        <Confirm
                            open={openConfirm}
                            header='Delete appointment'
                            content='This action cannot be undone. Are you sure?'
                            cancelButton='Cancel'
                            confirmButton="Delete"
                            onCancel={open}
                            onConfirm={() => deleteAppointment(appointment.id)}
                        />
                    </Segment.Group>
            )) : <Segment placeholder>
            <Header icon>
                <Icon name='check circle outline' color='green'/>
                Rest easy! There are currently no pending appointments.
            </Header>
        </Segment>}
        </>
    )
})