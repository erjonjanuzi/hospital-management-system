import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Divider, Header, Image, List, Modal, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

interface Props {
  id: string
}

export default observer(function ViewAppointment({id}: Props) {
  const { modalStore, appointmentsStore: { loadAppointment, selectedAppointment } } = useStore();

  useEffect(() => {
    if (id) loadAppointment(id);
}, [id, loadAppointment]);

  return (
    <>
      <Segment>
        <Header content='Appointment details' />
        <p>{selectedAppointment?.status}</p>
      </Segment>
    </>
  );
});
