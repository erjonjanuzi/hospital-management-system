import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, Icon, Segment } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';

interface Props {
    patient: Patient;
}

export default observer(function PatientDetailedInfo({patient}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>Kjo oshtfaqja qe spo bon</p>
                        <p>{patient.firstName}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal' />
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})