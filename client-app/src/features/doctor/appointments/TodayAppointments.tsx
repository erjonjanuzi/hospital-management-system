import { observer } from 'mobx-react-lite';
import { Segment, Icon, Header } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import DoctorAppointmentItem from './DoctorAppointmentItem';

export default observer(function TodayAppointments() {
    const { appointmentsStore, userStore } = useStore();
    const { loadDoctorAppointments, appointmentRegistry, appointments, cancelAppointment } = appointmentsStore;
    const { user } = userStore;

    /**
     * This constant gets the today date in local time
     */
    const date = new Date();
    
    const todayAppointments = appointments.filter(a => new Date(a.date).getDate() == date.getDate() && a.status == 'Active');
    let hasAppointmentsToday: boolean = todayAppointments.length > 0;

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadDoctorAppointments(user?.id!);
    }, [appointmentRegistry.size, loadDoctorAppointments])

    return (
        <>
            {hasAppointmentsToday ?
                todayAppointments.map(appointment => (
                    <DoctorAppointmentItem appointment={appointment} />
                )) : <Segment placeholder>
                    <Header icon>
                        <Icon name='check' color='green' />
                        You are all done for today!
                    </Header>
                </Segment>}
        </>
    )
})