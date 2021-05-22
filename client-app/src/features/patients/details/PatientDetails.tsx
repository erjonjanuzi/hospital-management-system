import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import PatientDetailedInfo from './PatientDetailedInfo';

export default observer(function PatientDetails() {
    const {patientStore} = useStore();
    const {selectedPatient: patient, loadPatient, loadingInitial} = patientStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        console.log('po mrrin ktu');
        if (id) {
            loadPatient(id); 
        };
    }, [id, loadPatient]);

    if (!patient) console.log("nuk ka objekt" + patient);

    return (
        <Grid>
            <Grid.Column width={10}>
                <PatientDetailedInfo patient={patient!} />
            </Grid.Column>
            <Grid.Column width={6}>
            </Grid.Column>
        </Grid>
    )
})