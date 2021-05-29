import { observer } from 'mobx-react-lite'
import React from 'react'
import Breadcrumbs from '../patients/my-profile/Breadcrumbs'


export default observer(function Diagnosis(){
    return(
        <>
        <h1>Diagnosis</h1>
        <Breadcrumbs> </Breadcrumbs>
        </>
    )
});