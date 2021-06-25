import { observer } from 'mobx-react-lite';
import { Table, Button, Segment, Label, Item, Icon, Header, Popup, Confirm } from "semantic-ui-react";
import React, { useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default observer(function AppointmentsTable() {
    const { appointmentsStore, userStore, modalStore } = useStore();
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
            {appointments.map(appointment => (
                <Segment.Group>
                    <Segment>
                        <span>
                            <Header content='Status' />
                            {appointment.status}
                        </span>
                    </Segment>
                    <Segment>
                        <span>
                            <Header content='Date and time' />
                            <Icon name='calendar' color='teal' />{appointment.date.toString().split('T')[0]}
                            <Icon name='clock' color='teal' />{appointment.date.toString().split('T')[1]}
                        </span>
                    </Segment>
                    <Segment>
                        <span>
                            <Header content='Patient' />
                            {appointment.patient ? appointment.patient.firstName + ' ' + appointment.patient.lastName
                                : 'Not assigned yet!'}
                        </span>
                    </Segment>
                    <Segment>
                        <span>
                            <Header content='Doctor' />
                            {appointment.doctor ? appointment.doctor?.firstName + ' ' + appointment.doctor?.lastName
                                : 'Not assigned yet!'}
                        </span>
                    </Segment>
                    <Segment clearing>
                        <Popup content='Open appointment details' trigger={
                            <Button
                                color='teal'
                                content='View'
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
                        onConfirm={() => deleteAppointment(appointment.id).then(open)}
                    />
                </Segment.Group>

            ))}
        </>
    )
})