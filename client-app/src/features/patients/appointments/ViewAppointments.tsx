import { observer } from "mobx-react-lite";
import React from "react";
import {
  Button,

  Divider,
  Header,
  Image,

  List,
  Modal,
  Segment
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ViewAppointments() {
  const { modalStore } = useStore();

  const staticPatient = {
    // personal information
    fullName: "Gresa Berisha",
    email: "gresaberisha@medcare.com",
    dateOfBirth: "11/09/2001",
    gender: "Female",
    phoneNumber: "+383 (0)43 4334 53435",
    address: "Rr. Leke Dukagjini, Peje, 30000",
    state: "Kosovo",
    date:"29 AUG 2021",
    time:"02:00 PM",
    status:"Active"
  };

  return (
    <>
      <Header content="Appointment details" />
      <Divider />
      <Segment clearing>
        <List horizontal>
          <List.Item>
            <List.Content>
            <List.Header content="Date" />
              <List.Header as='h1'>{staticPatient.date}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item style={{ marginLeft: "150px" }}>
            <List.Content>
              <List.Header content="Time" />
              <List.Header as="h1">{staticPatient.time}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item style={{ marginLeft: "150px" }}>
            <List.Content>
              <List.Header content="Status" />
              <List.Header as="h1">{staticPatient.status}</List.Header>
            </List.Content>
          </List.Item>
        </List>
        <Header as="h2">
          <Image
            circular
            src="https://react.semantic-ui.com/images/avatar/large/patrick.png"
          />{" "}
          John Smith
        </Header>
        <p>Assiged doctor</p>
        <p>
          Hospital address: MedCare Hospital, Prishtina 10000, St. Mother
          Teresa, Kosovo
        </p>
      </Segment>
      <Segment clearing>
        <Modal.Content>
          <Header as="h4" content="Patient information" />
          <List.Item>
            <List.Header>Full Name: {staticPatient.fullName}</List.Header>
          </List.Item>
          <List.Item>
            <List.Header>Email address: {staticPatient.email}</List.Header>
          </List.Item>
          <List.Item>
            <List.Header>Date of Birth: {staticPatient.dateOfBirth}</List.Header>
          </List.Item>
          <List.Item>
            <List.Header>Phone number: {staticPatient.phoneNumber}</List.Header>
          </List.Item>
          <List.Item>
            <List.Header>Address: {staticPatient.address}</List.Header>
          </List.Item>
          <List.Item>
            <List.Header>State: {staticPatient.state}</List.Header>
          </List.Item>
          <List.Item>
            <List.Header>Gender: {staticPatient.gender}</List.Header>
          </List.Item>
        </Modal.Content>
      </Segment>
      <Modal.Actions>
        <Button color="blue" content="Back" onClick={modalStore.closeModal} />
        <Button
          content="Request cancellation"
          labelPosition="right"
          icon="trash alternate outline"
          negative
        />
      </Modal.Actions>
    </>
  );
});
