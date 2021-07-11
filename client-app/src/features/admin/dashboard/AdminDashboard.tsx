import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import AccountsOverviewDashboard from './AccountsOverviewDashboard';
import PendingAppointments from './PendingAppointments';
import WelcomeBanner from './WelcomeBanner';

export default function AdminDashboard() {
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
                    <Grid>
                        <Grid.Column width='8'>
                            <PendingAppointments />
                        </Grid.Column>
                        <Grid.Column width='8'>
                            <AccountsOverviewDashboard />
                    </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width='6'>
                    <Segment>kol 2</Segment>
                </Grid.Column>
            </Grid>
        </>
    )
}

/**
 * Accounts overview and number of accounts
 * Pending appointments
 * Welcome banner with live clock [X]
 *
 */