import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Divider, Header, Image, List, Modal, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

interface Props {
  id: string;
}

export default observer(function ViewPatient({ id }: Props) {
  const {
    patientStore: {
      loadPatient,
      selectedPatient: patient
    },
  } = useStore();

  useEffect(() => {
    if (id) loadPatient(id);
  }, [id, loadPatient]);

  return (
    <>
      <div>
      <Header content="Patient details" />
      <Divider />
      <Segment clearing>
        <Header as="h2">
          <Image
            circular
            src="https://react.semantic-ui.com/images/avatar/large/patrick.png"
          />{" "}
          
        </Header>
        <p>Assiged patient: {patient?.firstName} {patient?.lastName}</p>
        <p>
          Hospital address: MedCare Hospital, Prishtina 10000, St. Mother
          Teresa, Kosovo
        </p>
      </Segment>
      <Segment clearing>
        <Modal.Content>
          <Header as="h4" content="Patient information" />
          <List.Item>
            <List.Header>First Name: {patient?.firstName}</List.Header>
          </List.Item>
          <List.Item>
            <List.Header>Last Name: {patient?.lastName}</List.Header>
          </List.Item>
          <List.Item>
            <List.Header>Status: {patient?.status}</List.Header>
          </List.Item>
          <List.Item>
            <List.Header>Age: {patient?.age}</List.Header>
          </List.Item>
          <List.Item>
            <List.Header>Email: {patient?.email}</List.Header>
          </List.Item>
          <List.Item>
            <List.Header>Registered Since: {patient?.registeredSince.split('T')[0]}</List.Header>
          </List.Item>
        </Modal.Content>
      </Segment>
      </div>
    </>
  );
});
