import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';
import { useStore } from '../../../app/stores/store';

interface Props {
    patient: Patient;
}

export default observer(function PatientListItem({ patient }: Props) {
    const { patientStore } = useStore();
    const { deletePatient, loading } = patientStore;

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
                <Button
                    onClick={() => deletePatient(patient.id)}
                    color='red'
                    floated='right'
                    content='Delete'
                />
            </Segment>
        </Segment.Group>
    )
})