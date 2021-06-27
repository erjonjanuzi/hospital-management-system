import userEvent from '@testing-library/user-event'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Card, Container, Divider, Grid, Icon, Image, List, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'


export default observer(function Profile(){

    const { commonStore, userStore } = useStore()
    const { user } = userStore;
    useEffect(() => {
        if (commonStore.token) {
        userStore.getUser();
        } else {
        commonStore.setAppLoaded();
        }
    }, [commonStore, userStore])

    const staticPatient = {
        // personal information
        fullName: "Engjëll Avdiu",
        date: "21 April 2001",
        gender: "Male",
        phoneNumber: "+383 (0)49 466 692",

        // medical information
        medicalId: "192047219",
        height: "188 cm",
        bloodType: "0(poz)",
        medicalCon: "High Blood Pressure",

        //billing information
        firstName: "Engjëll",
        lastName: "Avdiu",
        address: "Str. Ferat Dragaj, Mitrovice, 40000",
        state: "Kosovo"

    }
    return(
        <>
        <Segment>
        <Grid padded container >
            <Grid.Column width='4'>
            
            <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' wrapped ui={false} />    
                <Card.Content>
                    <Card.Header textAlign='center'>
                        
                        <Icon name='edit outline' size='large'></Icon>
                        <Icon name='clipboard list' color='red' size='large'></Icon>
                    </Card.Header>
                </Card.Content>
            </Card>
            </Grid.Column>

            <Grid.Column  width='12'>
            <div>
                <Container textAlign='justified'>
                <b>Personal Information</b> 
                {/* test */}
                <Divider hidden/>
                <List>
                    <List.Item>
                        <List.Header>Full Name:</List.Header>
                        {user?.firstName+" "+user?.lastName} 
                    </List.Item>
                    <List.Item>
                        <List.Header>Date of birth:</List.Header>
                        {staticPatient.date}
                    </List.Item>
                    <List.Item>
                        <List.Header>Gender:</List.Header>
                        {staticPatient.gender}
                    </List.Item>
                    <List.Item>
                        <List.Header>Phone Number</List.Header>
                        {staticPatient.phoneNumber}
                    </List.Item>
                </List>
                <Divider hidden/>
                <Divider/>
                </Container>
            
                <Container textAlign='justified'>
                <b>Medical</b>
                <Divider hidden/>
                <List>
                    <List.Item>
                        <List.Header>MedicalID:</List.Header>
                        {staticPatient.medicalId}
                    </List.Item>
                    <List.Item>
                        <List.Header>Height:</List.Header>
                        {staticPatient.height}
                    </List.Item>
                    <List.Item>
                        <List.Header>Blood Type:</List.Header>
                        {staticPatient.bloodType}
                    </List.Item>
                    <List.Item>
                        <List.Header>Medical Conditions:</List.Header>
                        {staticPatient.medicalCon}
                    </List.Item>
                </List>
                <Divider/>
                </Container>
                <Container textAlign='justified'>
                <b>Billing information</b>
                <Divider hidden/>
                <List>
                    <List.Item>
                        <List.Header>First Name</List.Header>
                        {staticPatient.firstName}
                    </List.Item>
                    <List.Item>
                        <List.Header>Last Name</List.Header>
                        {staticPatient.lastName}
                    </List.Item>
                    <List.Item>
                        <List.Header>Address</List.Header>
                        {staticPatient.address}
                    </List.Item>
                    <List.Item>
                        <List.Header>State</List.Header>
                        {staticPatient.state}
                    </List.Item>
                </List>
                <Divider/>
                </Container>
            </div>      
            </Grid.Column>
        </Grid> 
        </Segment>   
        </>
        )
})