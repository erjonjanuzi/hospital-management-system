import { Header, Segment, Tab } from 'semantic-ui-react';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import TodayAppointments from './TodayAppointments';
import CompletedAppointments from './CompletedAppointments';
import UpcomingAppointments from './UpcomingAppointments';

export default function DoctorAppointments() {

    const panes = [
        {
            menuItem: { key: 'today', content: 'Today' },
            render: () => <Tab.Pane><TodayAppointments /></Tab.Pane>,
        },
        {
            menuItem: { key: 'upcoming', content: 'Upcoming' },
            render: () => <Tab.Pane><UpcomingAppointments /></Tab.Pane>,
        },
        {
            menuItem: { key: 'completed', content: 'Completed' },
            render: () => <Tab.Pane><CompletedAppointments /></Tab.Pane>,
        }
    ]

    return (
        <>
            <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <Header as='h1' content='Appointments' />
                </Segment>
            </Segment.Group>
            <Tab panes={panes} />
        </>
    )
}