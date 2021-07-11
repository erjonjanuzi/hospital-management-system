import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AddRoom from './AddRoom';
import React, { useEffect } from 'react';
import ViewRoom from './ViewRoom';
import Breadcrumbs from '../../../app/layout/Breadcrumbs';

export default observer(function RoomManagement() {
    const { roomStore,modalStore } = useStore();
    const { rooms, roomRegistry, loadRooms, deleteRoom } = roomStore

    useEffect(() => {
        if (roomRegistry.size <= 0) loadRooms();
    }, [roomRegistry.size, loadRooms])




    return (
        <>
            <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <Header as='h1' content='Room Management' />
                </Segment>
            </Segment.Group>
            <Segment>
                <Button content='New Room'  color='green' onClick={() => modalStore.openModal(<AddRoom />)} />
                <Table textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>RoomNo</Table.HeaderCell>
                            <Table.HeaderCell>Room Type</Table.HeaderCell>
                            <Table.HeaderCell>Floor</Table.HeaderCell>
                            <Table.HeaderCell>Department</Table.HeaderCell>
                            <Table.HeaderCell>Patient</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>

                    </Table.Header>
                    <Table.Body >
                        {rooms.map(room => (
                            <Table.Row key={room.id}>
                                <Table.Cell>{room.roomNo}</Table.Cell>
                                <Table.Cell>{room.roomType}</Table.Cell>
                                <Table.Cell>{room.floor}</Table.Cell>
                                <Table.Cell>{room.department}</Table.Cell>
                                <Table.Cell>{room.patient}</Table.Cell>

                                <Table.Cell>
                                    <Button icon='edit' color='blue'
                                        onClick={() => modalStore.openModal(<ViewRoom id={room.id} />)}
                                    />
                                    <Button icon='delete' color='red'
                                        onClick={() => deleteRoom(room.id)}
                                    />
                                </Table.Cell>
                                <Table.Row />
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>
        </>
    )
})