import { observer } from 'mobx-react-lite';
import { Segment, Icon, Header } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import DoctorAppointmentItem from './DoctorAppointmentItem';

export default observer(function CompletedAppointments() {
    const { appointmentsStore, userStore } = useStore();
    const { loadDoctorAppointments, appointmentRegistry, appointments } = appointmentsStore;
    const { user } = userStore;

    let completedAppointments: boolean = (appointments.filter(a => a.status === 'Completed')).length > 0;

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadDoctorAppointments(user?.id!);
    }, [appointmentRegistry.size, loadDoctorAppointments])

    return (
        <>
            {completedAppointments ?
                appointments.map(appointment => (
                    <DoctorAppointmentItem appointment={appointment} />
                )) : <Segment placeholder>
                    <Header icon>
                        <Icon name='x' />
                        You don't have any completed appointments yet!
                    </Header>
                </Segment>}
        </>
    )
})