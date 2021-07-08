import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Divider, Grid, Header, Icon, Item, Segment, Label, Container, Message } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

interface Props {
  id: string
}

export default observer(function DoctorViewAppointment({ id }: Props) {
  const { appointmentsStore: { loadAppointment, selectedAppointment, markAsComplete }, modalStore } = useStore();

  const [details, setDetails] = useState(false);

  useEffect(() => {
    if (id) loadAppointment(id);
  }, [id, loadAppointment]);

  return (
    <>
      <Header content='Appointment details' />
      <Divider />
      <Grid>
        <Grid.Column width='8' textAlign='center'>
          <Icon name='user doctor' color='teal' /><span>Doctor</span>
          <Divider />
          <Segment>
            {selectedAppointment?.patient ?
              <Item>
                <Item.Image style={{ marginBottom: 3 }} size='tiny' circular src='/assets/user.png' />
                <Item.Content>
                  <Item.Header>{selectedAppointment?.patient?.firstName + ' ' + selectedAppointment?.patient?.lastName}</Item.Header>
                </Item.Content>
                {details &&
                  <>
                    <Container textAlign='left'>
                      <br />
                      <span><Label content='Email' />{`${selectedAppointment.patient.email}`}</span><br /><br />
                      <span><Label content='Registered since' />{`${selectedAppointment.patient.registeredSince}`}</span><br /><br />
                      <span><Label content='Gender' />{'  Male'}</span><br />
                    </Container>
                  </>
                }
                <br />
                {details ? <Button icon='arrow up' color='facebook' onClick={() => setDetails(false)} />
                  : <Button animated='vertical' color='facebook' onClick={() => setDetails(true)}>
                    <Button.Content hidden><Icon name='arrow down' /></Button.Content>
                    <Button.Content visible>
                      <span>More</span>
                    </Button.Content>
                  </Button>
                }
              </Item>
              :
              <Item>

                <Item.Content>
                  <Item.Header color='red'>Patient no longer exists</Item.Header>
                </Item.Content>
              </Item>
            }
          </Segment>
        </Grid.Column>
        <Grid.Column width='8' textAlign='left'>
          <Icon name='info circle' color='teal' /><span>Details</span>
          <Divider />
          {selectedAppointment?.status === 'Active' &&
            <Message
              icon='check'
              header='This appointment is scheduled and active'
              content='Once this appointment is completed with the patient, click the Mark as Completed button below'
            />
          }
          <Segment color={selectedAppointment?.status === 'Active'
            || selectedAppointment?.status === 'Completed' ? 'green' : 'red'} inverted>
            {selectedAppointment?.status}
          </Segment>
          <Label content='Date and Time' />
          <Segment.Group>
            <Segment>
              <Icon name='calendar' color='teal' /><span>{selectedAppointment?.date.toString().split('T')[0]}</span>
            </Segment>
            <Segment>
              <Icon name='time' color='teal' /><span>{(selectedAppointment?.date.toString().split('T')[1])?.split(":")[0]
                + ":" + (selectedAppointment?.date.toString().split('T')[1])?.split(":")[1]}</span>
            </Segment>
            <Segment>
              <Icon name='location arrow' color='teal' /><span>MedCare Hospital, Prishtina 10000, Kosovo</span>
            </Segment>
          </Segment.Group>
          <br />
          <Label content='Reason for appointment' />
          <Segment>
            {selectedAppointment?.reason}
          </Segment>
          <Label content='Comment by patient' />
          <Segment>
            {selectedAppointment?.comment ? selectedAppointment?.comment : 'No comment'}
          </Segment>
          {selectedAppointment?.status !== 'Completed' &&
            <Button
              positive
              content='Mark as completed'
              icon='check'
              onClick={() => markAsComplete(selectedAppointment?.id).catch(error => console.log(error)).then(modalStore.closeModal)} />
          }
        </Grid.Column>
      </Grid>
    </>
  );
});
