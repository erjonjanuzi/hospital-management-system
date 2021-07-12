import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AdminViewAppointment from '../appointments/AdminViewAppointment';

export default observer(function PendingAppointments() {
    const { appointmentsStore, modalStore } = useStore();
    const { loadAppointments, appointmentRegistry, appointments, numberOfPendingAppointments } = appointmentsStore;

    let count = 0;

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadAppointments();
    }, [appointmentRegistry.size, loadAppointments])

    return (
        <>
            {numberOfPendingAppointments > 0 ?
                <Segment>
                    <Header as='h2'>
                        Pending appointments
                        <Label as='h2'
                            content={numberOfPendingAppointments < 4 ? numberOfPendingAppointments : '3+'}
                            color='red'
                            circular
                        />
                    </Header>
                    {
                        appointments.map(appointment => (
                            <>
                                {count++ < 3 && appointment.status === 'Pending' &&
                                    <Segment.Group key={appointment.id}>
                                        <Segment color='green'>
                                            <Icon name='calendar outline' />
                                            {appointment.date.toString().split('T')[0]}
                                            {'\t\t'}
                                            <Icon name='clock outline' />
                                            {appointment.date.toString().split('T')[1]}
                                        </Segment>
                                        <Segment clearing>
                                            {appointment.patient?.firstName + ' ' + appointment.patient?.lastName}
                                            <Button
                                                floated='right'
                                                color='teal'
                                                content='View'
                                                onClick={() => modalStore.openModal(<AdminViewAppointment id={appointment.id!} />)}
                                            />
                                        </Segment>
                                    </Segment.Group>
                                }
                            </>
                        ))}

                    <Button content='All appointments' positive icon='chevron right' as={Link} to='/admin/appointments' />
                </Segment> :
                <Segment>
                    <Header as='h2' content='Pending appointments' />
                    <Header icon style={{ margin: '50px 0' }}>
                        <Icon name='check circle outline' color='green' />
                        Rest easy! There are currently no pending appointments.
                    </Header>
                </Segment>
            }
        </>
    )
})