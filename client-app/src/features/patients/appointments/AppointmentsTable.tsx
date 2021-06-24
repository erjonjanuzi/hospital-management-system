import { observer } from 'mobx-react-lite';
import { Table, Button, Segment, Label, Item, Icon, Header, Popup } from "semantic-ui-react";
import React from 'react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ViewAppointment from './ViewAppointment';

export default observer(function AppointmentsTable() {
    const { appointmentsStore, userStore, modalStore } = useStore();
    const { loadPatientAppointments, appointmentRegistry, appointments } = appointmentsStore;
    const { user } = userStore;

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadPatientAppointments(user?.id!);
    }, [appointmentRegistry.size, loadPatientAppointments])

    return (
        <>
            {appointments.map(appointment => (
                <Segment.Group>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Item.Header as={Link}>
                                        {`Appointment No. ${appointment.id}`}
                                    </Item.Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
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
                            <Header content='Doctor' />
                            {appointment.doctor ? appointment.doctor?.firstName + ' ' + appointment.doctor?.lastName
                                : 'Not assigned yet!'}
                        </span>
                    </Segment>
                    <Segment clearing>
                        <Popup content='Open appointment ' trigger={
                            <Button
                                color='teal'
                                content='View'
                                onClick={() => modalStore.openModal(<ViewAppointment id={appointment.id!} />)}
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

    /*return (
        <Table textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={style}>Appointment No.</Table.HeaderCell>
                        <Table.HeaderCell style={style}>Date</Table.HeaderCell>
                        <Table.HeaderCell style={style}>Time</Table.HeaderCell>
                        <Table.HeaderCell style={style}>Doctor</Table.HeaderCell>
                        <Table.HeaderCell style={style}>Status</Table.HeaderCell>
                        <Table.HeaderCell style={style}>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {appointments.map(appointment => (
                        <Table.Row key={appointment.id}>
                            <Table.Cell>{appointment.id}</Table.Cell>
                            <Table.Cell>{appointment.date.toString().split("T")[0]}</Table.Cell>
                            <Table.Cell>{appointment.date.toString().split("T")[1]}</Table.Cell>
                            <Table.Cell>{
                                appointment.doctor ? appointment.doctor.firstName + ' ' + appointment.doctor.lastName : "Not assigned yet"    
                            }</Table.Cell>
                            <Table.Cell>{appointment.status}</Table.Cell>
                            <Table.Cell>
                                <Button content='Edit' icon='edit' basic color='youtube'/>
                                <Button icon='delete' color='red'/>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
    )*/
})