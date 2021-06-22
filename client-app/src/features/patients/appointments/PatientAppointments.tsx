import React from 'react';
import { Segment } from "semantic-ui-react";
import AppointmentsTable from './AppointmentsTable';


export default function PatientAppointments(){
    return (
        <>
            <Segment>
                <h1>Appointments Page</h1>
                <AppointmentsTable />
            </Segment>
        </>
    )
}