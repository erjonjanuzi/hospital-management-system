import { observer } from 'mobx-react-lite';
import { Segment, Icon, Header } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import DoctorAppointmentItem from './DoctorAppointmentItem';

export default observer(function UpcomingAppointments() {
    const { appointmentsStore, userStore } = useStore();
    const { loadDoctorAppointments, appointmentRegistry, appointments } = appointmentsStore;
    const { user } = userStore;

    const date = new Date();

    const upcomingAppointments = appointments.filter(a => a.status === 'Active' && new Date(a.date).getDate() !== date.getDate());
    let hasUpcomingAppointments: boolean = upcomingAppointments.length > 0;

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadDoctorAppointments(user?.id!);
    }, [appointmentRegistry.size, loadDoctorAppointments])

    return (
        <>
            {hasUpcomingAppointments ?
                upcomingAppointments.map(appointment => (
                    <DoctorAppointmentItem appointment={appointment} />
                )) : <Segment placeholder>
                    <Header icon>
                        <Icon name='x' />
                        You don't have any upcoming appointments yet!
                    </Header>
                </Segment>}
        </>
    )
})