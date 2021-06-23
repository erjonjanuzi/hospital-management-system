import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Icon, Segment, Header, Divider } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import AppointmentsTable from './AppointmentsTable';
import AppointmentForm from './AppointmentForm';


export default observer(function PatientAppointments() {
    const { modalStore } = useStore();

    return (
        <>
            <Segment>
                <h1>Appointments</h1>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <Header as='h3' sub content='Want to create a new appointment?' style={{marginRight: '5px'}}/>
                    <Button animated color='teal' onClick={() => modalStore.openModal(<AppointmentForm />)}>
                        <Button.Content visible>New appointment</Button.Content>
                        <Button.Content hidden>
                            <Icon name='plus' />
                        </Button.Content>
                    </Button>
                </div>
                <Divider />
                <AppointmentsTable />
            </Segment>
        </>
    )
})