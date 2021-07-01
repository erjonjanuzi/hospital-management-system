import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Divider, Grid, Item, Segment } from "semantic-ui-react";
import modalStore from "../../../app/stores/modalStore";
import { useStore } from "../../../app/stores/store";
import EditVaccionation from "./EditVaccionation";

interface Props {
    id: string;
  }

export default observer(function ViewVaccination({ id }: Props) {
  const {vaccinationStore: {loadVaccine, selectedVaccine: vaccine}, modalStore} = useStore();

  useEffect(() => {
    if (id) loadVaccine(id);
  }, [id, loadVaccine]);

  return (
    <>

<Segment>
    <Grid columns={2} relaxed='very'>
      <Grid.Column>
          <Item>
              <Item.Content>
                  <Item.Header>Name: {vaccine?.firstName} </Item.Header>
                  <Item.Header>Lastname: {vaccine?.lastName} </Item.Header>
                  <Item.Header>Age: {vaccine?.age} </Item.Header>
                 <Divider/>
                  <Item.Header>Email: {vaccine?.email} </Item.Header>
                  <Item.Header>Date: {vaccine?.date.split('T')[0]} </Item.Header>
                  <Item.Header>Location: MedCare Hospital, Prishtina 10000, St. Mother
          Teresa, Kosovo</Item.Header>
              </Item.Content>
              <Divider/>
              <h5>• This is the permission for a vaccine to be administered to the person above and a record of the vaccination to be entered into
theMedCare Hospital</h5>
<h6>Please keep this letter with you at all times, as you will need to confirm that the hospital has provided you an authorization letter in order to receive the vaccine.</h6>
          </Item>
      </Grid.Column>
      <Grid.Column>
          <Item>
              {/* <Item.Content>
                  <Item.Header>1. Are you feeling sick today?</Item.Header>
                  <Item.Header> • {vaccine?.condition} </Item.Header>
              </Item.Content> */}
              <Divider/>
              <Item.Header>2. Have you ever received a dose of COVID-19 vaccine?If yes, which vaccine product did you receive?</Item.Header>
              <Item.Header> • I recived the {vaccine?.received} vaccine</Item.Header>
              {console.log(Error)}
              <Divider/>
              <Item.Header>3. Which COVID-19 vaccine do you want to receive?</Item.Header>
              <Item.Header> • I want to recive the {vaccine?.vaccine} vaccine</Item.Header>
              <Divider/>
              <Item.Header>4. Have you ever had an allergic reaction?</Item.Header>
              <Item.Header> • Yes, i had {vaccine?.allergies}</Item.Header>
              <Divider/>
              <Item.Header>5. What applied to you?</Item.Header>
              <Item.Header> • {vaccine?.information}</Item.Header>
              <Divider/>
              {/* <Item.Header>6. Do you have any chronical diseases?</Item.Header>
              <Item.Header> • {vaccine?.description}</Item.Header> */}
          </Item>
      </Grid.Column>
    </Grid>

    <Divider vertical>And</Divider>
    <Button content='Edit' icon='edit' basic color='youtube'
     onClick={() => modalStore.openModal(<EditVaccionation id={vaccine?.id!} />)} />   
            <Button
              basic
              color="red"
              content="Cancel"
              onClick={modalStore.closeModal}
            />
  </Segment>
    </>
  );
});
