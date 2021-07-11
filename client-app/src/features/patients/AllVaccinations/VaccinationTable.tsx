import React from 'react';
import { Header, Segment, Tab } from 'semantic-ui-react';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';
import OtherVaccination from '../other-vaccs/OtherVaccination';
import Vaccination from '../vaccination/Vaccination';

export default function VaccinationTable(){
    const panes = [
        {
            menuItem: { key: 'covid', content: 'Covid' },
            render: () => <Tab.Pane><Vaccination /></Tab.Pane>,
        },
        {
            menuItem: { key: 'other vaccines', content: 'Other Vaccines' },
            render: () => <Tab.Pane><OtherVaccination /></Tab.Pane>
        }
    ]
    return (
        <>
            <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <Header as='h1' content='Vaccination' />
                </Segment>
            </Segment.Group>
            <Tab panes={panes} />
        </>
    )
}