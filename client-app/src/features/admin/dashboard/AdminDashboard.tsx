import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { Item, Menu, Tab, Image, Header, Container } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import NavBar from './NavBar';

export default observer(function AdminDashboard() {
    return (
        <NavBar />
    )
})