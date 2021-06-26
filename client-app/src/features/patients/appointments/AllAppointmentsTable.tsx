import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import AppointmentItem from './AppointmentItem';

export default observer(function AllAppointmentsTable() {
    const { appointmentsStore, userStore } = useStore();
    const { loadPatientAppointments, appointmentRegistry, appointments } = appointmentsStore;
    const { user } = userStore;

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadPatientAppointments(user?.id!);
    }, [appointmentRegistry.size, loadPatientAppointments])

    return (
        <>
            {appointments.map(appointment => (
                <AppointmentItem appointment={appointment}/>
            ))}
        </>
    )
})