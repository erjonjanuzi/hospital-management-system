import { observer } from 'mobx-react-lite';
import { Button, Segment, Item, Icon, Header, Popup, Grid, Card, Image, Confirm } from "semantic-ui-react";
import { useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ViewAppointment from './ViewAppointment';
import { Appointment } from '../../../app/models/appointment';

interface Props {
    appointment: Appointment
}

export default observer(function AppointmentItem({ appointment }: Props) {
    const { appointmentsStore, userStore, modalStore } = useStore();
    const { loadPatientAppointments, appointmentRegistry, cancelAppointment } = appointmentsStore;
    const { user } = userStore;

    const [openConfirm, setOpenConfirm] = useState(false);
    function open() {
        setOpenConfirm(!openConfirm);
    }

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadPatientAppointments(user?.id!);
    }, [appointmentRegistry.size, loadPatientAppointments])

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
                                {appointment.doctor ?
                                    <Item>
                                        <Popup
                                            hoverable
                                            trigger={
                                                <Item.Image style={{ marginBottom: 3 }} size='mini' circular src='/assets/user.png' />
                                            }
                                        >
                                            <Popup.Content>
                                                <Card as={Link}>
                                                    <Image size='tiny' src='/assets/user.png' />
                                                    <Card.Content>
                                                        <Card.Header>{appointment.doctor.firstName + ' ' + appointment.doctor.lastName}</Card.Header>
                                                        <Card.Description>Demantology</Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <Button icon='heart outline' basic color='red' />
                                                    </Card.Content>
                                                </Card>
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
                                    onClick={() => modalStore.openModal(<ViewAppointment id={appointment.id!} />)}
                                />}
                            />
                            {appointment.status !== 'Completed' &&
                                <Popup content='Cancel this appointment with immediate effect' trigger={
                                    <Button
                                        icon='cancel'
                                        color='red'
                                        content='Cancel appointment'
                                        disabled={appointment.status === 'Canceled' || appointment.status === 'Denied'}
                                        onClick={open}
                                        basic
                                    />
                                } />
                            }

                        </Grid.Column>
                    </Grid>
                </Segment>
                <Confirm
                    open={openConfirm}
                    header='Cancel appointment'
                    content='This action cannot be undone. Are you sure?'
                    cancelButton='Cancel'
                    confirmButton="Cancel the appointment"
                    onCancel={open}
                    onConfirm={() => cancelAppointment(appointment.id).then(open)}
                />
            </Segment.Group>
        </>
    )
})