import { observer } from "mobx-react-lite";
import React from "react";
import {
  Button,
  Checkbox,
  Container,
  Dropdown,
  Header,
  Icon,
  Image,
  Pagination,
  Progress,
  Segment,
  Table
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import Breadcrumbs from "../my-profile/Breadcrumbs";

export default observer(function AppointmetsPatient() {
  const [] = React.useState(false);
  const { modalStore } = useStore();

  return (
    <h1>test</h1>)
    /*
    <Container>
      <Breadcrumbs></Breadcrumbs>
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
              <Button
                content="View"
                basic
                color="grey"
                onClick={() => modalStore.openModal(<ViewAppointments />)}
              />
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
              <Button
                content="View"
                basic
                color="grey"
                onClick={() => modalStore.openModal(<ViewAppointments />)}
              />
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
              <Button
                content="View"
                basic
                color="grey"
                onClick={() => modalStore.openModal(<ViewAppointments />)}
              />
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
              <Button
                content="View"
                basic
                color="grey"
                onClick={() => modalStore.openModal(<ViewAppointments />)}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={10}
      />
    </Container>*/
});
