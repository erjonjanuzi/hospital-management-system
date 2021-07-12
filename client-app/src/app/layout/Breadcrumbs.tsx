import React from 'react';
import { useLocation } from 'react-router';
import { Breadcrumb } from 'semantic-ui-react';

export default function Breadcrumbs() {
    const path = useLocation();
    const sections = [
        { key: path.pathname.split("/")[1], content: path.pathname.split("/")[1], link: false },
        { key: path.pathname.split("/")[2], content: path.pathname.split("/")[2], active: true },
    ]

    return (
        <Breadcrumb icon='right angle' sections={sections} />
    )
}