import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../../app/stores/store'

export default observer(function AddPersonalInfo() {

    const { personalInfoStore } = useStore();
    const { } = personalInfoStore;


    return (
        <>

        </>
    )
})