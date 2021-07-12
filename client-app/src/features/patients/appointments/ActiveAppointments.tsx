import { observer } from 'mobx-react-lite';
import { Segment, Icon, Header } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import AppointmentItem from './AppointmentItem';

export default observer(function AllAppointmentsTable() {
    const { appointmentsStore, userStore } = useStore();
    const { loadPatientAppointments, appointmentRegistry, appointments } = appointmentsStore;
    const { user } = userStore;
    let activeAppointments: boolean = (appointments.filter(x => x.status === 'Active')).length > 0;

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadPatientAppointments(user?.id!);
    }, [appointmentRegistry.size, loadPatientAppointments])

    return (
        <>
            {activeAppointments ?
                appointments.map(appointment => (
                    appointment.status === 'Active' &&
                    <AppointmentItem appointment={appointment} />
                )) : <Segment placeholder>
                    <Header icon>
                        <Icon name='x' />
                        You don't have any active appointments!
                    </Header>
                </Segment>}
        </>
    )
})