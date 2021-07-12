import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Card, Grid, Icon, Image, Segment, Tab } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import BillingInfo from './BillingInfo'
import MedicalInfo from './MedicalInfo'
import PersonalInfo from './PersonalInfo'


export default observer(function Profile() {

    const { userStore: { user, getUser }
    } = useStore();


    useEffect(() => {
        getUser();
    }, [user, getUser])

    // const { userStore: { user }, profileStore: { loadPatient, selectedPatient: patient }, modalStore } = useStore();

    // useEffect(() => {
    //     loadPatient(user?.id!);
    // }, [loadPatient])



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
                            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
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