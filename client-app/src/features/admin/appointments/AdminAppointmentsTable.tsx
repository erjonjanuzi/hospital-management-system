import { observer } from 'mobx-react-lite';
import { Table, Button, Segment, Label, Item, Icon, Header, Popup } from "semantic-ui-react";
import React from 'react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default observer(function AppointmentsTable() {
    const { appointmentsStore, userStore, modalStore } = useStore();
    const { loadAppointments, appointmentRegistry, appointments } = appointmentsStore;

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
                        {appointment.status === 'Completed'
                            ? <Button icon='trash' color='red' />
                            : <Popup content='Appointment not completed yet' trigger={<Button icon='trash' color='red' disabled />} />}

                    </Segment>
                </Segment.Group>
            ))}
        </>
    )
})