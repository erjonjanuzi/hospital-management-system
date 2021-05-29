import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card, Container, Divider, Grid, Icon, Image, List } from 'semantic-ui-react'

export default observer(function profile(){
    return(
        <>
   
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
                        <List.Header>Full Name:</List.Header>Engjëll Avdiu
                    </List.Item>
                    <List.Item>
                        <List.Header>Date of birth:</List.Header>
                        21 April 2001
                    </List.Item>
                    <List.Item>
                        <List.Header>Gender:</List.Header>
                        Male
                    </List.Item>
                    <List.Item>
                        <List.Header>Phone Number</List.Header>
                        +383 (0)49 466 692
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
                        <List.Header>MedicalID:</List.Header>192047219
                    </List.Item>
                    <List.Item>
                        <List.Header>Height:</List.Header>
                        188cm
                    </List.Item>
                    <List.Item>
                        <List.Header>Blood Type:</List.Header>
                        0(poz)
                    </List.Item>
                    <List.Item>
                        <List.Header>Medical Conditions:</List.Header>
                        Smut
                    </List.Item>
                </List>
                <Divider/>
                </Container>
                <Container textAlign='justified'>
                <b>Billing information</b>
                <Divider hidden/>
                <List>
                    <List.Item>
                        <List.Header>First Name</List.Header>Engjëll
                    </List.Item>
                    <List.Item>
                        <List.Header>Last Name</List.Header>
                        Avdiu
                    </List.Item>
                    <List.Item>
                        <List.Header>Address</List.Header>
                        Str. Ferat Dragaj, Mitrovice, 40000
                    </List.Item>
                    <List.Item>
                        <List.Header>State</List.Header>
                        Kosovo
                    </List.Item>
                </List>
                <Divider/>
                </Container>
            </div>      
            </Grid.Column>
        </Grid>    
        </>
        )
})