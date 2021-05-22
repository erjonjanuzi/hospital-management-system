import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';

interface Props {
    patient: Patient;
}

export default function PatientListItem({patient}: Props){
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header as={Link} to={`/patients/${patient.id}`}>
                                {patient.firstName} {patient.lastName} {patient.id}
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment clearing>
                <Button 
                    as={Link}
                    to={`/patients/${patient.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}