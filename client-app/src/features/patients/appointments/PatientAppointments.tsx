import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Icon, Segment, Header, Divider, Tab, Menu } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import AppointmentsTable from './AppointmentsTable';
import AppointmentForm from './AppointmentForm';


export default observer(function PatientAppointments() {
    const { modalStore } = useStore();

    const panes = [
        {
            menuItem: { key: 'all', content: 'All' },
            render: () => <Tab.Pane><AppointmentsTable /></Tab.Pane>,
        },
        {
            menuItem: { key: 'active', content: 'Active' },
            render: () => <Tab.Pane><AppointmentsTable /></Tab.Pane>,
        },
        {
            menuItem: { key: 'completed', content: 'Completed' },
            render: () => <Tab.Pane><AppointmentsTable /></Tab.Pane>,
        }
    ]

    return (
        <>
            <Segment>
                <h1>My Appointments</h1>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <Header as='h3' sub content='Want to create a new appointment?' style={{ marginRight: '5px' }} />
                    <Button animated color='teal' onClick={() => modalStore.openModal(<AppointmentForm />)}>
                        <Button.Content visible>New appointment</Button.Content>
                        <Button.Content hidden>
                            <Icon name='plus' />
                        </Button.Content>
                    </Button>
                </div>
            </Segment>
            <Tab panes={panes} />
        </>
    )
})