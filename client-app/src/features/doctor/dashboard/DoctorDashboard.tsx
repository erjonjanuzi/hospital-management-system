import { observer } from 'mobx-react-lite';
import React from 'react';
import { Divider, Tab } from 'semantic-ui-react';
import Breadcrumbs from '../../patients/my-profile/Breadcrumbs';

export default observer(function DoctorDashboard() {

    const panes = [
        { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
        { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
        { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]

    return (
        <>
        <Breadcrumbs></Breadcrumbs>

        <Divider hidden />
        <Tab 
            menu={{fluid: true, vertical: true}}
            menuPosition='left'
            panes={panes}
        />
        </>
    )
})