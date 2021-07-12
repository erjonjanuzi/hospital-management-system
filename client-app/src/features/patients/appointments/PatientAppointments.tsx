import { observer } from 'mobx-react-lite';
import { Button, Icon, Segment, Header, Tab, Grid } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import AppointmentForm from './AppointmentForm';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import AllAppointmentsTable from './AllAppointmentsTable';
import ActiveAppointments from './ActiveAppointments';
import CompletedAppointments from './CompletedAppointments';


export default observer(function PatientAppointments() {
    const { modalStore } = useStore();

    const panes = [
        {
            menuItem: { key: 'all', content: 'All' },
            render: () => <Tab.Pane><AllAppointmentsTable /></Tab.Pane>,
        },
        {
            menuItem: { key: 'active', content: 'Active' },
            render: () => <Tab.Pane><ActiveAppointments /></Tab.Pane>,
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
                    <Header as='h1' content='My Appointments' />
                </Segment>
            </Segment.Group>
            <Grid >
                <Grid.Column width='12'>
                    <Tab panes={panes} />
                </Grid.Column>
                <Grid.Column width='4'>
                    <Segment textAlign='center' style={{ marginTop: '42px' }}>
                        <Header as='h3' content='Want to create a new appointment?' />
                        <span>Schedule your appoinment with a click of a few buttons</span>
                        <br /><br />
                        <Icon name='stethoscope' size='massive' />
                        <br /><br />
                        <Button animated color='teal' onClick={() => modalStore.openModal(<AppointmentForm />)}>
                            <Button.Content visible>New appointment</Button.Content>
                            <Button.Content hidden>
                                <Icon name='plus' />
                            </Button.Content>
                        </Button>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )
})