import { observer } from 'mobx-react-lite';
import { Segment, Icon, Header } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import DoctorAppointmentItem from './DoctorAppointmentItem';

export default observer(function TodayAppointments() {
    const { appointmentsStore, userStore } = useStore();
    const { loadDoctorAppointments, appointmentRegistry, appointments, cancelAppointment } = appointmentsStore;
    const { user } = userStore;

    const date = new Date();

    console.log(date.getDate());
    // to be continued
    let todayAppointments: boolean = (appointments.filter(a => a.date.getDate == date.getDate)).length > 0;

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadDoctorAppointments(user?.id!);
    }, [appointmentRegistry.size, loadDoctorAppointments])

    return (
        <>
            {todayAppointments ?
                appointments.map(appointment => (
                    console.log('Appointmeit ' + appointment.date.getDate()),
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