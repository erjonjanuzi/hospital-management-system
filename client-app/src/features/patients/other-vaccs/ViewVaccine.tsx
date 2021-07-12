import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Divider, Grid, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import EditOtherVaccs from "./EditOtherVaccs";

interface Props {
  id: string;
}

export default observer(function ViewVaccination({ id }: Props) {
  const {
    otherVaccsStore: { loadDiffVaccine, selectedOtherVacc: vaccine },
    modalStore,
  } = useStore();

  useEffect(() => {
    if (id) loadDiffVaccine(id);
  }, [id, loadDiffVaccine]);

  return (
    <>
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <Item>
              <Item.Content>
                <Item.Header>Name: {vaccine?.firstName} </Item.Header>
                <Item.Header>Lastname: {vaccine?.lastName} </Item.Header>
                <Item.Header>Age: {vaccine?.age} </Item.Header>
                <Divider />
                <Item.Header>
                  Location: MedCare Hospital, Prishtina 10000, St. Mother
                  Teresa, Kosovo
                </Item.Header>
              </Item.Content>
              <Divider />
              <h5>
                • This is the permission for a vaccine to be administered to the
                person above and a record of the vaccination to be entered into
                theMedCare Hospital
              </h5>
              <h6>
                Please keep this letter with you at all times, as you will need
                to confirm that the hospital has provided you an authorization
                letter in order to receive the vaccine.
              </h6>
            </Item>
          </Grid.Column>
          <Grid.Column>
            <Item>
              <Item.Header>
                1. Are you moderately or severely ill today?
              </Item.Header>
              <Item.Header> • {vaccine?.feeling}</Item.Header>
              <Divider />
              <Item.Header>
                2. Do you have any symptoms?
              </Item.Header>
              <Item.Header>
                • {vaccine?.symptoms}
              </Item.Header>
              <Divider />
              <Item.Header>
                3. Which vaccine do you want to receive?
              </Item.Header>
              <Item.Header> • {vaccine?.vaccineType}</Item.Header>
            </Item>
          </Grid.Column>
        </Grid>

        <Divider vertical>And</Divider>
        <Button
          content="Edit"
          icon="edit"
          basic
          color="youtube"
          onClick={() =>
            modalStore.openModal(<EditOtherVaccs id={vaccine?.id!} />)
          }
        />
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
