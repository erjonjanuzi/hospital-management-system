import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import PatientListItem from './PatientListItem';

export default observer(function PatientList() {
    const { patientStore } = useStore();
    const { patients } = patientStore;

    return (
        <>
            {patients.map(patient => (
                <PatientListItem key={patient.id} patient={patient}/>
            ))}
        </>
    )
})