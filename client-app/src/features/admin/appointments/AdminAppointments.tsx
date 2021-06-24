import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Icon, Segment, Header, Divider, Tab, Menu, Label } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import AdminAppointmentsTable from './AdminAppointmentsTable';
import RequestedAppointments from './RequestedAppointments';


export default observer(function AdminAppointments() {
    const { appointmentsStore } = useStore();

    const panes = [
        {
            menuItem: { key: 'appointments', content: 'All appointments' },
            render: () => <Tab.Pane><AdminAppointmentsTable /></Tab.Pane>,
        },
        {
            menuItem: (
                <Menu.Item key='pending'>
                    Pending
                    {appointmentsStore.numberOfPendingAppointments > 0 
                        ? <Label color='red'>{appointmentsStore.numberOfPendingAppointments}</Label>
                        : ''
                    }
                </Menu.Item>
            ),
            render: () => <Tab.Pane><RequestedAppointments /></Tab.Pane>,
        },
    ]

    return (
        <>
            <Segment>
                <h1>Hospital Appointments</h1>
            </Segment>
            <Tab panes={panes} />
        </>
    )
})