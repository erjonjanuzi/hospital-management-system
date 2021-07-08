import { observer } from 'mobx-react-lite';
import { Button, Segment, Item, Icon, Header, Popup, Grid, Card, Image, Confirm } from "semantic-ui-react";
import { useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ViewAppointment from './ViewAppointment';
import AppointmentItem from './AppointmentItem';

export default observer(function CompletedAppointmentsTable() {
    const { appointmentsStore, userStore, modalStore } = useStore();
    const { loadPatientAppointments, appointmentRegistry, appointments, cancelAppointment } = appointmentsStore;
    const { user } = userStore;
    let completedAppointments: boolean = (appointments.filter(x => x.status === 'Completed')).length > 0;

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadPatientAppointments(user?.id!);
    }, [appointmentRegistry.size, loadPatientAppointments])

    return (
        <>
            {completedAppointments ?
                appointments.map(appointment => (
                    appointment.status === 'Completed' &&
                    <AppointmentItem appointment={appointment} />
                )) : <Segment placeholder>
                    <Header icon>
                        <Icon name='x' />
                        You don't have any completed appointments yet!
                    </Header>
                </Segment>}
        </>
    )
})