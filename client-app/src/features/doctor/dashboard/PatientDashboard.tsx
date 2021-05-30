import { observer } from 'mobx-react-lite';
import React from 'react'; 
import { Grid, Segment , Icon, Header, Image, Breadcrumb,Table, Button, Divider } from 'semantic-ui-react';

const src = '/images/wireframe/image-text.png'
export default observer(function PatientDashboard (){
    return(
        <Grid>

                <Grid.Row>
                    {/*Kolona e pare*/ }

                <Grid.Column width={6}>
                                    <Grid.Row>
                                    <Grid.Column>
                                    <Segment>           
                                        <h3>Welcome Back, Andis!</h3>
                                        <h5><Icon color = 'green' name='calendar alternate outline'></Icon>Friday-05 May 2021 <Icon color='green' name='clock'></Icon>04:30</h5>
                                    </Segment>


                                    <Segment>  
                                        <Header>
                                            <h3>Your most recent doctor</h3>
                                        </Header>   
                                        <Grid.Row>
                                            <Header as='h1' image>
                                                <Image circular src='https://react.semantic-ui.com/images/avatar/small/lena.png'/>
                                                <Header.Content>
                                                    Joana Smith
                                                <Header.Subheader>Ophthalmology</Header.Subheader>
                                                <Header.Subheader><Breadcrumb.Section link>View all</Breadcrumb.Section></Header.Subheader>
                                                </Header.Content>
                                                </Header>
                                        </Grid.Row>  
                                    </Segment>  
                                </Grid.Column>   
                                    </Grid.Row>
                </Grid.Column>
                <Divider hidden />

                {/*Kolona e dyte*/ }

                <Grid.Column width={4}>
                                    <Grid.Column width='4'>   
                                                <Segment textAlign='center'>
                                                    <h2 > Notifications <Icon color='black' name='bell'></Icon></h2>
                                                    <Icon size='massive' name='bell slash outline' color='black'/>
                                                    <Header.Subheader>You currently don't have any</Header.Subheader>
                                                    <Header.Subheader>new notifications</Header.Subheader>
                                                    <Breadcrumb.Section link>View all</Breadcrumb.Section>
                                                </Segment>
                                    </Grid.Column> 
                </Grid.Column>
                
                </Grid.Row>


                <Grid.Column width={10}>
                                <Segment>
                                        <Header>
                                            <h3>Appointments <Icon name='hourglass outline'></Icon></h3>
                                        </Header>  

                                        <Table basic='very'>
                                            <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Upcoming</Table.HeaderCell>
                                                <Table.HeaderCell></Table.HeaderCell>
                                                <Table.HeaderCell></Table.HeaderCell>
                                                <Table.HeaderCell></Table.HeaderCell>
                                            </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>5 Jun 2021</Table.Cell>
                                                <Table.Cell>06:00 PM</Table.Cell>
                                                <Table.Cell>Joana Smith<Image size='mini' circular src='https://react.semantic-ui.com/images/avatar/small/lena.png'/></Table.Cell>
                                                <Table.Cell><Button size='mini' positive>View</Button></Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>9 Aug 2021</Table.Cell>
                                                <Table.Cell>09:00 AM</Table.Cell>
                                                <Table.Cell>Joana Smith<Image size='mini' circular src='https://react.semantic-ui.com/images/avatar/small/lena.png'/></Table.Cell>
                                                <Table.Cell><Button size='mini' positive>View</Button></Table.Cell>
                                            </Table.Row>
                                            <Table.Header>
                                                <Table.Row>
                                                <Table.HeaderCell>Recent</Table.HeaderCell>
                                                <Table.HeaderCell></Table.HeaderCell>
                                                <Table.HeaderCell></Table.HeaderCell>
                                                <Table.HeaderCell></Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Row>
                                                <Table.Cell>24 Feb 2021</Table.Cell>
                                                <Table.Cell>02:30 PM</Table.Cell>
                                                <Table.Cell>Joana Smith<Image size='mini' circular src='https://react.semantic-ui.com/images/avatar/small/lena.png'/></Table.Cell>
                                                <Table.Cell><Breadcrumb.Section link>View all</Breadcrumb.Section></Table.Cell>
                                            </Table.Row>
                                            <Button positive>Set new appointments +</Button>
                                            </Table.Body>
                                        </Table>
                                </Segment>
                </Grid.Column>

                {/*Kolona e trete*/ }

                <Grid.Column width={6}>
                                    <Grid.Column>
                                                <Segment>
                                                <Grid.Row stretched>
                                                <Image src={src} size='massive' floated='left' />
                                                <p>
                                                Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
                                                facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
                                                referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
                                                </p>
                                                </Grid.Row>

                                                </Segment>

                                                <Segment>
                                                <Image src={src} size='massive' floated='left' />
                                                <p>
                                                Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
                                                facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
                                                referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
                                                </p>
                                                </Segment>

                                                <Segment>
                                                <Image src={src} size='massive' floated='left' />
                                                <p>
                                                Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
                                                facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
                                                referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
                                                </p>
                                                </Segment>

                                                <Segment>
                                                <Image src={src} size='massive' floated='left' />
                                                <p>
                                                Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
                                                facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
                                                referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
                                                </p>
                                                </Segment>
                                    </Grid.Column>
                </Grid.Column>
        </Grid>
      )
})