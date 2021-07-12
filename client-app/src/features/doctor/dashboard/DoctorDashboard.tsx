import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import WelcomeBanner from '../../admin/dashboard/WelcomeBanner';
import TodayAppointments from '../appointments/TodayAppointments';
import AppointmentsCalendar from './AppointmentsCalendar';

export default function DoctorDashboard() {
    return (
        <>
            <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <Header as='h1' content='Dashboard' />
                </Segment>
            </Segment.Group>
            <Grid>
                <Grid.Column width='10'>
                    <WelcomeBanner />
                    <AppointmentsCalendar />
                </Grid.Column>
                <Grid.Column width='6'>
                    <Segment.Group>
                        <Segment>
                            <Header as='h2' content='Today appointments' icon='calendar outline' />
                        </Segment>
                        <Segment>
                            <TodayAppointments />
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        </>
    )
}