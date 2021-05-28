import React from 'react';
import { observer } from 'mobx-react-lite';
import SidePanel from './SidePanel';
import Profile from './Profile';

export default observer(function PatientProfile() {
    return (
        <>
        <SidePanel></SidePanel>
        <Profile></Profile>
        </>
    )
})