import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Divider, Grid, Header, Icon, Segment, Label, Message } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import DoctorProfileCard from "../../admin/appointments/DoctorProfileCard";

interface Props {
  id: string
}

export default observer(function ViewAppointment({ id }: Props) {
  const { appointmentsStore: { loadAppointment, selectedAppointment } } = useStore();

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
          <DoctorProfileCard doctor={selectedAppointment?.doctor!} />
        </Grid.Column>
        <Grid.Column width='8' textAlign='left'>
          <Icon name='info circle' color='teal' /><span>Details</span>
          <Divider />
          {selectedAppointment?.status === 'Active' &&
            <Message
              icon='check'
              header='This appointment is scheduled and active'
              content='Please make sure you arrive at the hospital at least 30 minutes before your scheduled time'
            />
          }
          {selectedAppointment?.status === 'Pending' &&
            <Message
              icon='hourglass outline'
              header='This appointment is under review'
              content='Please be aware that the chosen date and time can be changed without any notice'
            />
          }
          <Segment color={selectedAppointment?.status === 'Active'
            || selectedAppointment?.status === 'Completed' ? 'green' : 'red'} inverted>
            {selectedAppointment?.status}
          </Segment>
          <br />
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
          <Label content='Reason' />
          <Segment>
            {selectedAppointment?.reason}
          </Segment>
          <Label content='Comment' />
          <Segment>
            {selectedAppointment?.comment ? selectedAppointment?.comment : 'No comment'}
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
});
