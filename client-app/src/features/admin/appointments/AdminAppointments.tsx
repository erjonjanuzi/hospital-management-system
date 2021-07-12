import { observer } from 'mobx-react-lite';
import { Segment, Tab, Menu, Label } from "semantic-ui-react";
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
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
            <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <h1>Hospital Appointments</h1>
                </Segment>
            </Segment.Group>
            <Tab panes={panes} />
        </>
    )
})