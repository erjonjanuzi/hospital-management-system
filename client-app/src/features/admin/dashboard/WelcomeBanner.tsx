import { observer } from 'mobx-react-lite';
import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import Clock from 'react-live-clock';

export default observer(function WelcomeBanner() {
    const {userStore: {user}} = useStore();
    const date = new Date();

    return (
        <>
            <Segment>
                <Header as='h1' content={`Welcome back, ${user?.firstName}`} />
                <Icon color='teal' name='calendar alternate outline' />
                <span>{date.toDateString()}</span>
                <Icon style={{marginLeft: '10px'}} color='teal' name='clock'/>
                
            </Segment>
        </>
    )
})

//<Clock ticking={true} format='HH:mm:ss' />