import { Grid, Label, Segment, Table } from 'semantic-ui-react';

// interface Props {
//     patient: PatientProfile
// }

export default function Profile() {

    const Patient = {
        firstName: "Engjell",
        lastName: "Avdiu",
        userName: "Engjell Avdiu",
        email: "engjell@test.com",
        registeredSince: "01/07/2021",
        personalNumber: "1244629233",
        dateOfBirth: "21/04/2001",
        gender: "Male",
        phoneNumber: "+38349466692",
        countryName: "Kosovo",
        countryId: "XK",
        cityName: "Mitrovice",
        cityZip: "40000",
        address: "Rr. Ferat Dragaj",
        nationalityName: "Shqipretare",
        maritalStatus: "Married"

    }

    return (
        <>
            <Segment>
                <Grid>
                    <Grid.Column width='8'>
                        <Table basic='very' collapsing >
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Firstname' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.firstName}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Lastname' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.lastName}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Username' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.userName}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Email' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.email}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Registered since' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.registeredSince.toString().split("T")[0]}</Table.Cell>
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
                                    <Table.Cell>{Patient?.personalNumber}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Date of birth' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.dateOfBirth.toString().split("T")[0]}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Gender' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.gender}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Phone number' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.phoneNumber}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Country' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.countryName + ', ' + Patient?.countryId}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='City' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.cityName + ', ' + Patient?.cityZip}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Address' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.address}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Nationality' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.nationalityName}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Marital status' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.maritalStatus}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </Segment>
        </>
    )
}