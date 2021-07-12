import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Icon, Segment, Image } from 'semantic-ui-react';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import { useStore } from '../../../app/stores/store';
import WelcomeBanner from '../../admin/dashboard/WelcomeBanner';
import ActiveAppointments from '../appointments/ActiveAppointments';
import AppointmentForm from '../appointments/AppointmentForm';
import DoctorsDashboard from './DoctorsDashboard';

export default observer(function PatientDashboard() {
    const { modalStore } = useStore();

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
                            <Segment.Group>
                                <Segment>
                                    <Header as='h2' content='Active appointments' />
                                </Segment>
                                <Segment textAlign='center'>
                                    <ActiveAppointments />
                                    <Button as={Link}
                                        to='/patient/appointments'
                                        positive
                                        content='View all appointments'
                                        icon='eye'
                                    />
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>
                        <Grid.Column width='8'>
                            <Segment.Group>
                                <Segment>
                                    <Header as='h2' content='Doctors' icon='user doctor' />
                                </Segment>
                                <Segment textAlign='center'>
                                    <DoctorsDashboard />
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width='6'>
                    <Segment textAlign='center'>
                        <Header as='h3' content='Want to create a new appointment?' />
                        <span>Schedule your appoinment with a click of a few buttons</span>
                        <br /><br />
                        <Icon name='stethoscope' size='massive' />
                        <br /><br />
                        <Button animated color='teal'
                            onClick={() => modalStore.openModal(<AppointmentForm />)}
                        >
                            <Button.Content visible>New appointment</Button.Content>
                            <Button.Content hidden>
                                <Icon name='plus' />
                            </Button.Content>
                        </Button>
                    </Segment>
                    <Segment textAlign='center'>
                        <Header as='h2' content='Visit our online pharmacy' />
                        <Image
                            fluid
                            centered
                            src='https://res.cloudinary.com/dcfzd0pgt/image/upload/v1626101390/istockphoto-1132087010-612x612_bkywar.jpg'
                            as={Link}
                            to='/patient/pharmacy-table'
                        />
                        <br />
                        <Button as={Link}
                            to='/patient/pharmacy-table'
                            positive
                            content='View all products'
                            icon='medkit'
                        />
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )
})