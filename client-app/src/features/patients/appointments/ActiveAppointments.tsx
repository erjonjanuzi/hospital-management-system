import { observer } from 'mobx-react-lite';
import { Segment, Icon, Header } from "semantic-ui-react";
import { useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import AppointmentItem from './AppointmentItem';

export default observer(function AllAppointmentsTable() {
    const { appointmentsStore, userStore, modalStore } = useStore();
    const { loadPatientAppointments, appointmentRegistry, appointments, cancelAppointment } = appointmentsStore;
    const { user } = userStore;
    let activeAppointments: boolean = (appointments.filter(x => x.status === 'Active')).length > 0;
    const [openConfirm, setOpenConfirm] = useState(false);
    function open() {
        setOpenConfirm(!openConfirm);
    }

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