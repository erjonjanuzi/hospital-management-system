import { observer } from 'mobx-react-lite';
import { Button, Segment, Item, Icon, Header, Popup, Grid, Card, Image, Confirm, Label } from "semantic-ui-react";
import { useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Appointment } from '../../../app/models/appointment';
import DoctorViewAppointment from './DoctorViewAppointment';

interface Props {
    appointment: Appointment
}

export default observer(function DoctorAppointmentItem({ appointment }: Props) {
    const { modalStore } = useStore();

    return (
        <>
            <Segment.Group>
                <Segment color={appointment.status === 'Canceled' ? 'red' : 'teal'} inverted secondary>
                    {`Appointment No.${appointment.id}`}
                </Segment>
                <Segment disabled={appointment.status === 'Canceled' || appointment.status === 'Denied'}>
                    <Grid>
                        <Grid.Column width='4' textAlign='center'>
                            <span>
                                {appointment.patient ?
                                    <Item>
                                        <Popup
                                            hoverable
                                            trigger={
                                                <Label style={{marginBottom: 3}} circular color='blue' size='massive' 
                                                    content={`${appointment.patient.firstName[0]}${appointment.patient.lastName[0]}`} />
                                            }
                                        >
                                            <Popup.Content>
                                                <Card as={Link}>
                                                <Label style={{marginBottom: 3}} circular color='blue' size='massive' 
                                                    content={`${appointment.patient.firstName[0]}${appointment.patient.lastName[0]}`} />
                                                    <Card.Content>
                                                        <Card.Header>{appointment.patient.firstName + ' ' + appointment.patient.lastName}</Card.Header>
                                                        <Card.Description>
                                                            {`Registered since ${appointment.patient.registeredSince.split("T")[0]}`}
                                                        </Card.Description>
                                                    </Card.Content>
                                                </Card>
                                            </Popup.Content>
                                        </Popup>

                                        <Item.Content>
                                            <Item.Header>{appointment.patient?.firstName + ' ' + appointment.patient?.lastName}</Item.Header>
                                        </Item.Content>
                                    </ Item>
                                    : <Item.Content style={{ color: 'red' }}>{`Patient no longer exists`}</Item.Content>
                                }
                            </span>
                        </Grid.Column>
                        <Grid.Column width='3'>
                            <span>
                                <Icon name='calendar' color='teal' />{appointment.date.toString().split('T')[0]}
                            </span>
                            <br />
                            <span>
                                <Icon name='clock' color='teal' />
                                {(appointment.date.toString().split('T')[1]).split(":")[0] + ':' +
                                    (appointment.date.toString().split('T')[1]).split(":")[1]}
                            </span>
                        </Grid.Column>
                        <Grid.Column width='1'>
                            <Header
                                icon={appointment.status === 'Completed' ? 'check' : ''}
                                content={appointment.status}
                                color={appointment.status === 'Active' || appointment.status === 'Completed' ? 'green' : 'red'}
                            />
                        </Grid.Column>
                        <Grid.Column width='8' textAlign='center'>
                            <Popup content='Open appointment ' trigger={
                                <Button
                                    disabled={appointment.status === 'Canceled'}
                                    color='facebook'
                                    content='View'
                                    onClick={() => modalStore.openModal(<DoctorViewAppointment id={appointment.id!} />)}
                                />}
                            />
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Segment.Group>
        </>
    )
})