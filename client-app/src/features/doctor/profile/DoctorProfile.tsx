import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Grid, Header, Image, Segment } from 'semantic-ui-react';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import { useStore } from '../../../app/stores/store';
import DoctorProfileDetails from './DoctorProfileDetails';
import EditProfile from './EditProfile';

export default observer( function DoctorProfile() {
    const { userStore: { user }, profileStore: { loadDoctor, selectedDoctor: doctor }, modalStore } = useStore();

    useEffect(() => {
        loadDoctor(user?.id!);
    }, [user])

    return (
        <>
            <Segment>
                <Breadcrumbs />
            </Segment>
            <Segment>
                <Header as='h1' content='My Profile' />
            </Segment>
            <Segment>
                <Grid>
                    <Grid.Column width='3'>
                        <Image src='/assets/user.png' circular size='small'/>
                    </Grid.Column>
                    <Grid.Column width='12'>
                        <DoctorProfileDetails doctor={doctor!}/>
                    </Grid.Column>
                    <Grid.Column width='1'>
                        <Button icon='edit' basic onClick={() => modalStore.openModal(<EditProfile doctor={doctor!}/>)}/>
                    </Grid.Column>
                </Grid>
            </Segment>
        </>
    )
})