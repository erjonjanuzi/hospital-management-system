import { observer } from 'mobx-react-lite';
import { Table, Button, Segment, Label, Item, Icon, Header, Popup, Grid, Divider } from "semantic-ui-react";
import React from 'react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ViewAppointment from './ViewAppointment';
import { Fragment } from 'react';

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
                    <Segment color='teal' inverted secondary>
                        {`Appointment No.${appointment.id}`}
                    </Segment>
                    <Segment>
                        <Grid>
                            <Grid.Column width='6' textAlign='center'>
                                <span>
                                    {appointment.doctor ?
                                        <Item>
                                            <Popup
                                                hoverable
                                                trigger={
                                                    <Item.Image style={{ marginBottom: 3 }} size='mini' circular src='/assets/user.png' />
                                                }
                                            >
                                                <Popup.Content>
                                                    {appointment.doctor.email}
                                                </Popup.Content>
                                            </Popup>

                                            <Item.Content>
                                                <Item.Header>{appointment.doctor?.firstName + ' ' + appointment.doctor?.lastName}</Item.Header>
                                            </Item.Content>
                                        </ Item>
                                        : <Item.Content style={{ color: 'red' }}>{`Doctor not assigned yet`}</Item.Content>

                                    }
                                </span>
                            </Grid.Column>
                            <Grid.Column width='3'>
                                <span>
                                    <Icon name='calendar' color='teal' />{appointment.date.toString().split('T')[0]}
                                </span>
                                <br />
                                <span>
                                    <Icon name='clock' color='teal' />{appointment.date.toString().split('T')[1]}
                                </span>
                            </Grid.Column>
                            <Grid.Column width='1'>
                                <Header 
                                    content={appointment.status} 
                                    color={appointment.status === 'Active' || appointment.status === 'Completed' ? 'green' : 'red'} 
                                />
                            </Grid.Column>
                            <Grid.Column width='6' textAlign='center'>
                                <Popup content='Open appointment ' trigger={
                                    <Button
                                        color='teal'
                                        content='View'
                                        onClick={() => modalStore.openModal(<ViewAppointment id={appointment.id!} />)}
                                    />}
                                />
                                <Popup content='Cancel this appointment with immediate effect' trigger={
                                    <Button icon='trash' color='red' content='Cancel appointment' />
                                } />
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Segment.Group>
            ))}
        </>
    )
})