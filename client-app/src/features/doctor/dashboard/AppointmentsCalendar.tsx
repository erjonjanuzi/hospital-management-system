import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Calendar from 'react-awesome-calendar';
import { Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function AppointmentsCalendar() {
    const { appointmentsStore: { loadDoctorAppointments, appointmentRegistry, appointments }, userStore: { user } } = useStore();

    let events = new Array();
    const insertEvents = () => {
        for (let i = 0; i < appointments.length; i++) {
            const appDate = new Date(appointments[i].date);
            const date = new Date(appDate.getFullYear(), appDate.getMonth(), appDate.getDate(),
                appDate.getHours(), appDate.getMinutes() + 30, appDate.getSeconds());
            let appointment = {
                id: i + 1,
                color: appointments[i].status === 'Completed' ? 'green' : '#fd3153',
                from: appointments[i].date.toString() + "+00:00",
                to: date + "+00:00",
                title: appointments[i].patient?.firstName + ' ' + appointments[i].patient?.lastName
                    + ' / ' + appointments[i].reason,
            }
            events[i] = appointment;
        }
        return events;
    }

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadDoctorAppointments(user?.id!);
    }, [appointmentRegistry.size, loadDoctorAppointments])

    return (
        <Segment>
            <Calendar events={insertEvents()} />
        </Segment>
    )
})
