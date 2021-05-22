import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import PatientList from './PatientList';

export default observer(function PatientDashboard() {
    const { patientStore } = useStore();
    const { loadPatients, patientRegistry } = patientStore;

    useEffect(() => {
        if (patientRegistry.size <= 1) loadPatients();
    }, [patientRegistry.size, loadPatients])

    if (patientStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='16'>
                <PatientList />
            </Grid.Column>
        </Grid>
    )
})