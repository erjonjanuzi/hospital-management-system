import { Grid, Header, Label, Segment, Table } from 'semantic-ui-react';

// interface Props {
//     patient: PatientProfile
// }

export default function BillingInfo() {

    const Patient = {
        billingInfo: {
            firstName: "Engjell",
            lastName: "Avdiu",
            Address: "Rr. Ferat Dragaj",
            State: "Kosovo",
            City: "Mitrovice",
            postalCode: "40000",
            ccNumber: "**** **** **** 0707",
            expirationDate: "04 / 23",
            securityCode: "* * 3",
            cardType: "Visa",
        },
    }

    return (
        <>
            <Segment>
                <Grid>
                    <Grid.Column width='8'>
                        <Table basic='very' collapsing >
                            <Table.Body>
                                <Header style={{ marginTop: '15px' }} as='h1' content={"Billing Information"} />
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='First name' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.billingInfo.firstName}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Last name' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.billingInfo.lastName}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Addreess' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.billingInfo.Address}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='State' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.billingInfo.State}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='City' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.billingInfo.City}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Postal Code' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.billingInfo.postalCode}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>

                    <Grid.Column width='8'>

                        <Table basic='very' collapsing>
                            <Table.Body>
                                <Header style={{ marginTop: '15px' }} as='h1' content={"Payment Info"} />
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Credit Card Number' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.billingInfo.ccNumber}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Expiration Date' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.billingInfo.expirationDate}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Security Code' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.billingInfo.securityCode}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Card Type' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.billingInfo.cardType}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </Segment>
        </>
    )
}