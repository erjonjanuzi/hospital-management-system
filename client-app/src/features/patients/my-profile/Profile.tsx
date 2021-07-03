import userEvent from '@testing-library/user-event'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Card, Container, Divider, Grid, Icon, Image, List, Segment, Tab } from 'semantic-ui-react'
import PatientStore from '../../../app/stores/patientStore'
import { useStore } from '../../../app/stores/store'
import UserStore from '../../../app/stores/userStore'
import BillingInfo from './BillingInfo'
import MedicalInfo from './MedicalInfo'
import PersonalInfo from './PersonalInfo'


export default observer(function Profile() {

    const { accountManagementStore: { loadAccount, selectedAccount },
    diagnosisStore: { deleteDiagnosis, loadDiagnosisByPatient, selectedDiagnosis }, modalStore,
    userStore: {user, getUser}
    } = useStore();


    useEffect(() => {
        getUser();
      }, [user, getUser])

    // const { userStore: { user }, profileStore: { loadPatient, selectedPatient: patient }, modalStore } = useStore();

    // useEffect(() => {
    //     loadPatient(user?.id!);
    // }, [loadPatient])


    const staticPatient = {
        // personal information
        fullName: "Engjëll Avdiu",
        date: "21 April 2001",
        gender: "Male",
        phoneNumber: "+383 (0)49 466 692",

        // medical information
        medicalId: "192047219",
        height: "188 cm",
        bloodType: "0(poz)",
        medicalCon: "High Blood Pressure",

        //billing information
        firstName: "Engjëll",
        lastName: "Avdiu",
        address: "Str. Ferat Dragaj, Mitrovice, 40000",
        state: "Kosovo"

    }

    const panes = [
        {
            menuItem: { key: 'personal', content: 'Personal' },
            render: () => <Tab.Pane><PersonalInfo /></Tab.Pane>,
        },
        {
            menuItem: { key: 'medical', content: 'Medical' },
            render: () => <Tab.Pane><MedicalInfo id={user?.id!} /></Tab.Pane>,
        },
        {
            menuItem: { key: 'billing', content: 'Billing' },
            render: () => <Tab.Pane><BillingInfo /></Tab.Pane>,
        }
    ]

    return (
        <>
            <Segment>
                <Grid  >
                    <Grid.Column width='4'>

                        <Card>
                            <Image src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' wrapped ui={false} />
                            <Card.Content>
                                <Card.Header textAlign='center'>

                                    <Icon name='edit outline' size='large'></Icon>
                                    <Icon name='clipboard list' color='red' size='large'></Icon>
                                </Card.Header>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column width='12'>
                        <Tab panes={panes} />
                    </Grid.Column>
                </Grid>
            </Segment>
        </>
    )
})