import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Divider, Grid, Header, Icon, Image, Item, List, Modal, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

interface Props {
  id: string
}

export default observer(function ViewAppointment({ id }: Props) {
  const { modalStore, appointmentsStore: { loadAppointment, selectedAppointment } } = useStore();

  useEffect(() => {
    if (id) loadAppointment(id);
  }, [id, loadAppointment]);

  return (
    <>
      <Header content='Appointment details' />
      <Divider />
      <Grid>
        <Grid.Column width='8' textAlign='center'>
          <Icon name='user' color='teal' /><span>Doctor</span>
          <Divider />
          <Segment>
            {selectedAppointment?.doctor ?
              <Item>
                <Item.Image style={{ marginBottom: 3 }} size='tiny' circular src='/assets/user.png' />
                <Item.Content>
                  <Item.Header>{selectedAppointment?.doctor?.firstName + ' ' + selectedAppointment?.doctor?.lastName}</Item.Header>
                </Item.Content>
              </Item>
              :
              <Item>

                <Item.Content>
                  <Item.Header color='red'>Doctor not assigned yet</Item.Header>
                </Item.Content>
              </Item>
            }
          </Segment>
        </Grid.Column>
        <Grid.Column width='8' textAlign='left'>
          <Icon name='info circle' color='teal' /><span>Request details</span>
          <Divider />
          <Segment.Group>
            <Segment>
              <Icon name='calendar' color='teal' /><span>{selectedAppointment?.date.toString().split('T')[0]}</span>
            </Segment>
            <Segment>
              <Icon name='time' color='teal' /><span>{selectedAppointment?.date.toString().split('T')[1]}</span>
            </Segment>
            <Segment>
              <Icon name='location arrow' color='teal' /><span>MedCare Hospital, Prishtina 10000, Kosovo</span>
            </Segment>
          </Segment.Group>
            <Segment content='Description'>
              {selectedAppointment?.description}
            </Segment>
            <Segment color={selectedAppointment?.status === 'Active' 
              || selectedAppointment?.status === 'Completed' ? 'green' : 'red'} inverted>
              {selectedAppointment?.status}
            </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
});
