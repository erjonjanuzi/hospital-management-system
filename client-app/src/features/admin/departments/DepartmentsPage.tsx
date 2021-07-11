import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Table, Card, CardHeader, CardDescription, Item, Divider } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AddNewDepartment from './AddNewDepartment';
import React, { useEffect } from 'react';
import ViewDepartment from './ViewDepartment';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';

export default observer(function DepartmentsPage() {
    const { departmentStore, modalStore } = useStore();
    const { departments, departmentRegistry, loadDepartments, deleteDepartment } = departmentStore


    useEffect(() => {
        if (departmentRegistry.size <= 0) loadDepartments();
    }, [departmentRegistry.size, loadDepartments])

    return (
        <>
            <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <Header as='h1' content='Departments' />
                </Segment>
            </Segment.Group>
            <Segment>
                <Item>
                    <Button content='Add New Department' onClick={() => modalStore.openModal(<AddNewDepartment />)} />
                    <br />
                    <br />
                    <Card.Group>
                        {departments.map(department => (
                            <Card>
                                <Card.Content key={department.id}>

                                    <Card.Header>{department.name}</Card.Header>
                                    <Card.Meta>{department.capacity}</Card.Meta>
                                    <Card.Description>{department.description}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button content='Edit' icon='edit' basic color='blue'
                                            onClick={() => modalStore.openModal(<ViewDepartment id={department.id} />)}
                                        />
                                        <Button content='Delete' icon='delete' basic color='red'
                                            onClick={() => deleteDepartment(department.id)}
                                        />
                                    </div>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Item>
            </Segment>
        </>
    )
})