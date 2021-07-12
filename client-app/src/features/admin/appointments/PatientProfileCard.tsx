import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Segment, Item, Container, Label, Button, Icon, Table } from 'semantic-ui-react';
import { PatientProfile } from '../../../app/models/profile';

interface Props {
    patient: PatientProfile
}

export default observer(function PatientProfileCard({ patient }: Props) {

    const [details, setDetails] = useState(false);

    return (
        <Segment>
            {patient ?
                <Item>
                    <Label style={{ marginBottom: 3 }} circular color='blue' size='massive' content={`${patient.firstName[0]}${patient.lastName[0]}`} />
                    <Item.Content>
                        <Item.Header>{patient?.firstName + ' ' + patient?.lastName}</Item.Header>
                    </Item.Content>
                    {details &&
                        <>
                            <Container textAlign='left'>
                                <Table basic='very' collapsing >
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Label basic content='Username' />
                                            </Table.Cell>
                                            <Table.Cell>{patient?.userName}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Label basic content='Email' />
                                            </Table.Cell>
                                            <Table.Cell>{patient?.email}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Label basic content='Registered since' />
                                            </Table.Cell>
                                            <Table.Cell>{patient?.registeredSince.toString().split("T")[0]}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Label basic content='Gender' />
                                            </Table.Cell>
                                            <Table.Cell>Male</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Container>
                        </>
                    }
                    <br />
                    {details ? <Button icon='arrow up' color='facebook' onClick={() => setDetails(false)} />
                        : <Button animated='vertical' color='facebook' onClick={() => setDetails(true)}>
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
                        <Item.Header color='red'>Patient no longer exists</Item.Header>
                    </Item.Content>
                </Item>
            }
        </Segment>
    )
})