import { observer } from 'mobx-react-lite';
import { Button, Segment, Icon, Header, Popup, Confirm, Table } from "semantic-ui-react";
import { useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import NonPendingViewAppointment from './NonPendingViewAppointment';

export default observer(function AppointmentsTable() {
    const { appointmentsStore, modalStore } = useStore();
    const { loadAppointments, appointmentRegistry, appointments, deleteAppointment } = appointmentsStore;

    const [openConfirm, setOpenConfirm] = useState(false);

    function open() {
        setOpenConfirm(!openConfirm);
    }

    const nonPendingAppointments = appointments.filter(x => x.status !== 'Pending');

    useEffect(() => {
        if (appointmentRegistry.size <= 1) loadAppointments();
    }, [appointmentRegistry.size, loadAppointments])

    return (
        <>
            {nonPendingAppointments.length > 0 ?
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Patient</Table.HeaderCell>
                            <Table.HeaderCell>Date and Time</Table.HeaderCell>
                            <Table.HeaderCell>Doctor</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Options</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {nonPendingAppointments.map(appointment => (
                            <>
                                <Table.Row key={appointment.id}>
                                    <Table.Cell>{appointment.patient?.firstName + ' ' + appointment.patient?.lastName}</Table.Cell>
                                    <Table.Cell><Icon name='calendar' color='teal' />{appointment.date.toString().split('T')[0]}
                                        <Icon name='clock' color='teal' />{appointment.date.toString().split('T')[1]}</Table.Cell>
                                    <Table.Cell>{appointment.doctor ? appointment.doctor?.firstName + ' ' + appointment.doctor?.lastName
                                        : 'Not assigned yet!'}</Table.Cell>
                                    <Table.Cell>{appointment.status === 'Completed' ?
                                        <>
                                            <Icon name='check' color='green' />
                                            <span>{appointment.status}</span>
                                        </>
                                        :
                                        <span>{appointment.status}</span>}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Popup content='Details of this appointment' trigger={
                                            <Button
                                                color='teal'
                                                content='View'
                                                onClick={() => modalStore.openModal(<NonPendingViewAppointment id={appointment.id!} />)}
                                            />}
                                        />
                                        <Button animated='vertical' color='red' onClick={open}>
                                            <Button.Content hidden>Delete</Button.Content>
                                            <Button.Content visible>
                                                <Icon name='trash' />
                                            </Button.Content>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                                <Confirm
                                    open={openConfirm}
                                    header='Delete appointment'
                                    content='This action cannot be undone. Are you sure?'
                                    cancelButton='Cancel'
                                    confirmButton="Delete"
                                    onCancel={open}
                                    onConfirm={() => deleteAppointment(appointment.id)}
                                />
                            </>
                        ))}
                    </Table.Body>
                </Table>
                : <Segment placeholder>
                    <Header icon>
                        <Icon name='x' color='red' />
                        There are no appointments yet!
                    </Header>
                </Segment>}
        </>
    )
})