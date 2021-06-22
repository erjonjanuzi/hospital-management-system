import { observer } from 'mobx-react-lite';
import { Table } from "semantic-ui-react";
import React from 'react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';

export default observer( function AppointmentsTable() {
    const { appointmentsStore, userStore } = useStore();
    const { loadPatientAppointments, appointmentRegistry, appointments } = appointmentsStore;
    const { user } = userStore;

    const style = {
        color: "black",
        backgroundColor: "#3bbCA6"
    }

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadPatientAppointments("4d425ece-b458-4644-9151-fe733e646547");
    }, [appointmentRegistry.size, loadPatientAppointments])

    return (
        <Table textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={style}>Date</Table.HeaderCell>
                        <Table.HeaderCell style={style}>Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {appointments.map(appointment => (
                        <Table.Row key={appointment.id}>
                            <Table.Cell>{appointment.id}</Table.Cell>
                            <Table.Cell>{appointment.status}</Table.Cell>
                            <Table.Cell>{appointment.description}</Table.Cell>
                            <Table.Cell>{appointment.doctorId || 'Not yet assigned'}</Table.Cell>
                            <Table.Cell>{appointment.date}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
    )
})