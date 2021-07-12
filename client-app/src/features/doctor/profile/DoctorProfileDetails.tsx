import { Divider, Grid, Header, Label, Table } from 'semantic-ui-react';
import { DoctorProfile } from '../../../app/models/profile';

interface Props {
    doctor: DoctorProfile
}

export default function DoctorProfileDetails({ doctor }: Props) {


    return (
        <>
            <Header style={{ marginTop: '15px' }} as='h1' content={doctor?.firstName + ' ' + doctor?.lastName} />
            <Divider />
            <Grid>
                <Grid.Column width='8'>
                    <Table basic='very' collapsing >
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='Username' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.userName}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='Email' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.email}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='Specialty' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.specialty.name}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='Registered since' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.registeredSince.toString().split("T")[0]}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
                <Grid.Column width='8'>
                    <Table basic='very' collapsing >
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='Personal number' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.personalInfo.personalNumber}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='Date of birth' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.personalInfo.dateOfBirth.toString().split("T")[0]}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='Gender' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.personalInfo.gender}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='Phone number' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.personalInfo.phoneNumber}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='Country' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.personalInfo.country.name + ', ' + doctor?.personalInfo.country.id}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='City' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.personalInfo.city.name + ', ' + doctor?.personalInfo.city.zip}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='Address' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.personalInfo.address}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='Nationality' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.personalInfo.nationality.name}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label basic content='Marital status' />
                                </Table.Cell>
                                <Table.Cell>{doctor?.personalInfo.maritalStatus}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid>
        </>
    )
}