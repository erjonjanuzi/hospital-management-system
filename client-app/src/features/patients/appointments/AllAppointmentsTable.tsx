import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import AppointmentItem from './AppointmentItem';
import { Header, Icon, Segment } from 'semantic-ui-react';

export default observer(function AllAppointmentsTable() {
    const { appointmentsStore, userStore } = useStore();
    const { loadPatientAppointments, appointmentRegistry, appointments } = appointmentsStore;
    const { user } = userStore;

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadPatientAppointments(user?.id!);
    }, [appointmentRegistry.size, loadPatientAppointments])

    return (
        <>
            {appointmentRegistry.size > 0 ?
                appointments.map(appointment => (
                    <AppointmentItem appointment={appointment} />
                )) : <Segment placeholder>
                    <Header icon>
                        <Icon name='x' />
                        You don't have any scheduled appointments yet!
                    </Header>
                </Segment>}
        </>
    )
})