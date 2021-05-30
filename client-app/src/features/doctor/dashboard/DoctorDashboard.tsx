import { observer } from 'mobx-react-lite';
import React from 'react';
import { Divider } from 'semantic-ui-react';
import Breadcrumbs from '../../patients/my-profile/Breadcrumbs';
import PatientDashboard from './PatientDashboard';




export default observer(function DoctorDashboard() {
    return (
        <>
        <Breadcrumbs></Breadcrumbs>
        <Divider hidden />
        <PatientDashboard/>
        </>
    )
})