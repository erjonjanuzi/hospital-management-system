import React from 'react';
import { observer } from 'mobx-react-lite';
import Breadcrumbs from './Breadcrumbs';
import Profile from './Profile';

export default observer(function PatientProfile() {
    return (
        <>
            <Breadcrumbs></Breadcrumbs>
            <Profile></Profile>
        </>
    )
})