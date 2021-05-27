import React from "react";
import {
  Button,
  Checkbox,
  Container,
  Dropdown,
  Header,
  Icon,
  Image,
  Input,
  Menu,
  Modal,
  Progress,
  Segment,
  Table,
} from "semantic-ui-react";

export default function AppointmetsPatient() {
  const [open, setOpen] = React.useState(false);
  return (
    <Container>
      <Menu pointing style={{ borderRadius: "10px", padding: "10px" }}>
        <Menu.Item name="dashboard" />
        <Menu.Item name="appointments" />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item style={{ color: "black", backgroundColor: "#3BBCA6" }} name="Set new appointment" />
        </Menu.Menu>
      </Menu>
      <Segment>
        All Appointments
        <Progress percent={40} size="tiny" />
        <Checkbox label="See all" />
        <Dropdown
          position="right"
          style={{ left: "70%" }}
          options={[]}
          search
          selection
          placeholder="Sort by..."
        />
      </Segment>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              style={{ color: "black", backgroundColor: "#3BBCA6" }}
            >
              Date
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: "black", backgroundColor: "#3BBCA6" }}
            >
              Time
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: "black", backgroundColor: "#3BBCA6" }}
            >
              Location
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: "black", backgroundColor: "#3BBCA6" }}
            >
              Doctor
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: "black", backgroundColor: "#3BBCA6" }}
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: "black", backgroundColor: "#3BBCA6" }}
            >
              Actions
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: "black", backgroundColor: "#3BBCA6" }}
            >
              Details
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Checkbox label="17 Jun 2021" />{" "}
            </Table.Cell>
            <Table.Cell>02:30 PM</Table.Cell>
            <Table.Cell>MedCare Hospital, Prishtina branch</Table.Cell>
            <Table.Cell>
              <Header as="h4" image>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/small/lena.png"
                  rounded
                  size="mini"
                />
                <Header.Content>
                  Joana Smith
                  <Header.Subheader>Ophthalmology</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell positive>
              <Icon name="checkmark" />
              Approved
            </Table.Cell>
            <Table.Cell negative>
              {" "}
              Request cancellation
              <Icon link name="trash alternate outline" />
            </Table.Cell>
            <Table.Cell>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>View</Button>}
              >
                <Modal.Header>CAN THE TITLE CHANGE????</Modal.Header>
                <Modal.Content image>
                  <Image
                    size="medium"
                    src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                    wrapped
                  />
                  <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>Your appointment is set to be held next week.</p>
                    <p>
                      The correct date: Thursday, June 17, 2021 Time: 02:30 PM
                    </p>
                    <p>Doctor: Joana Smith</p>
                    <p>Is it okay to use this photo?</p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={() => setOpen(false)}>
                    No
                  </Button>
                  <Button
                    content="Yes, that's correct"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                  />
                </Modal.Actions>
              </Modal>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Checkbox label="05 Jun 2021" />{" "}
            </Table.Cell>
            <Table.Cell>04:20 PM</Table.Cell>
            <Table.Cell>MedCare Hospital, Prishtina branch</Table.Cell>
            <Table.Cell>
              <Header as="h4" image>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/small/lena.png"
                  rounded
                  size="mini"
                />
                <Header.Content>
                  Joana Smith
                  <Header.Subheader>Ophthalmology</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell negative>
              <Icon name="close" />
              Cancelled
            </Table.Cell>
            <Table.Cell negative>
              {" "}
              Request cancellation
              <Icon link name="trash alternate outline" />
            </Table.Cell>
            <Table.Cell>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>View</Button>}
              >
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                  <Image
                    size="medium"
                    src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                    wrapped
                  />
                  <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>
                      We've found the following gravatar image associated with
                      your e-mail address.
                    </p>
                    <p>Is it okay to use this photo?</p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={() => setOpen(false)}>
                    Nope
                  </Button>
                  <Button
                    content="Yep, that's me"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                  />
                </Modal.Actions>
              </Modal>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Checkbox label="21 Aug 2021" />{" "}
            </Table.Cell>
            <Table.Cell>10:40 AM</Table.Cell>
            <Table.Cell>MedCare Hospital, Prishtina branch</Table.Cell>
            <Table.Cell>
              <Header as="h4" image>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/small/lena.png"
                  rounded
                  size="mini"
                />
                <Header.Content>
                  Joana Smith
                  <Header.Subheader>Ophthalmology</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell positive>Completed</Table.Cell>
            <Table.Cell negative>
              {" "}
              Request cancellation
              <Icon link name="trash alternate outline" />
            </Table.Cell>
            <Table.Cell>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>View</Button>}
              >
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                  <Image
                    size="medium"
                    src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                    wrapped
                  />
                  <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>
                      We've found the following gravatar image associated with
                      your e-mail address.
                    </p>
                    <p>Is it okay to use this photo?</p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={() => setOpen(false)}>
                    Nope
                  </Button>
                  <Button
                    content="Yep, that's me"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                  />
                </Modal.Actions>
              </Modal>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Checkbox label="06 Jan 2021" />{" "}
            </Table.Cell>
            <Table.Cell>06:30 PM</Table.Cell>
            <Table.Cell>MedCare Hospital, Prishtina branch</Table.Cell>
            <Table.Cell>
              <Header as="h4" image>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/small/lena.png"
                  rounded
                  size="mini"
                />
                <Header.Content>
                  Joana Smith
                  <Header.Subheader>Ophthalmology</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell positive>Completed</Table.Cell>
            <Table.Cell negative>
              {" "}
              Request cancellation
              <Icon link name="trash alternate outline" />
            </Table.Cell>
            <Table.Cell>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>View</Button>}
              >
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                  <Image
                    size="medium"
                    src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                    wrapped
                  />
                  <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>
                      We've found the following gravatar image associated with
                      your e-mail address.
                    </p>
                    <p>Is it okay to use this photo?</p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={() => setOpen(false)}>
                    Nope
                  </Button>
                  <Button
                    content="Yep, that's me"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                  />
                </Modal.Actions>
              </Modal>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}
