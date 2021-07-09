import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Segment, Item, Container, Label, Button, Icon, Table } from 'semantic-ui-react';
import { DoctorProfile } from '../../../app/models/profile';

interface Props {
    doctor: DoctorProfile
}

export default observer(function DoctorProfileCard({ doctor }: Props) {

    const [doctorDetails, setDoctorDetails] = useState(false);

    return (
        <Segment>
            {doctor ?
                <Item>
                    <Item.Image style={{ marginBottom: 3 }} size='tiny' circular src='/assets/user.png' />
                    <Item.Content>
                        <Item.Header>{doctor?.firstName + ' ' + doctor?.lastName}</Item.Header>
                    </Item.Content>
                    {doctorDetails &&
                        <>
                            <Container textAlign='left'>
                                <Table basic='very' collapsing >
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Label basic content='Username' />
                                            </Table.Cell>
                                            <Table.Cell>{doctor?.userName}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Label basic content='Email' />
                                            </Table.Cell>
                                            <Table.Cell>{doctor?.email}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Label basic content='Specialty' />
                                            </Table.Cell>
                                            <Table.Cell>{doctor?.specialty.name}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Label basic content='Registered since' />
                                            </Table.Cell>
                                            <Table.Cell>{doctor?.registeredSince.toString().split("T")[0]}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Label basic content='Gender' />
                                            </Table.Cell>
                                            <Table.Cell>{doctor.personalInfo.gender}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Label basic content='Country' />
                                            </Table.Cell>
                                            <Table.Cell>{doctor.personalInfo.country.name}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Label basic content='City' />
                                            </Table.Cell>
                                            <Table.Cell>{`${doctor.personalInfo.city.name}, ${doctor.personalInfo.city.zip}`}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Container>
                        </>
                    }
                    <br />
                    {doctorDetails ? <Button icon='arrow up' color='facebook' onClick={() => setDoctorDetails(false)} />
                        : <Button animated='vertical' color='facebook' onClick={() => setDoctorDetails(true)}>
                            <Button.Content hidden><Icon name='arrow down' /></Button.Content>
                            <Button.Content visible>
                                <span>More</span>
                            </Button.Content>
                        </Button>
                    }
                </Item>
                :
                <Item>
                    <Item.Content>
                        <Item.Header color='red'>Doctor not assigned yet</Item.Header>
                    </Item.Content>
                </Item>
            }
        </Segment>
    )
})