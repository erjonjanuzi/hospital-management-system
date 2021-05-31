import { observer } from "mobx-react-lite";
import {
  Button,
  Modal,
  Card
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ViewDepartment() {
  const { modalStore } = useStore();

  return (
    <>
      <Modal.Header> <strong>Our Team</strong>
      </Modal.Header>
      <Modal.Content image scrolling>
        <Card.Group itemsPerRow={4}>
          <Card color='black' description='Elliot Baner' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/75Kh7YJV.png'} />
          <Card color='orange' description='Harold Simmons' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/kCOkTgJR.png'} />
          <Card color='yellow' description='Teresa Butler' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/S7asMCuA.png'} />
          <Card color='olive' description='Peter Flores' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/hAaJH0BS.png'} />
          <Card color='green' description='Hunter Sanders' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/ptNb5qGF.png'} />
          <Card color='teal' description='Alberto Bryant' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/fc6twz3J.png'} />
          <Card color='blue' description='Marlin Jenkins' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/NgLpanxt.png'} />
          <Card color='violet' description='Gabriela Ward' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/ccPkdaTT.png'} />
          <Card color='purple' description='Alice Patterson' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/6K5r19XH.png'} />
          <Card color='pink' description='Phoebe Bell' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/yTQr1wvl.png'} />
          <Card color='brown' description='Hector Ward' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/N2OXdqzk.png'} />
          <Card color='grey' description='Alexis Cox' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/qEUwBBCc.png'} />
          <Card color='black' description='Lena Smith' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/FRO4snS3.png'} />
          <Card color='orange' description='Tom Taylor' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/76rUUioc.png'} />
          <Card color='yellow' description='Nicole Green' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/KODzZX78.png'} />
          <Card color='olive' description='Alen Lee' image={'https://cms.livhospital.com/_uploads//Doctors/Lists/hd7GjwEX.png'} />
        </Card.Group>

      </Modal.Content>
      <Modal.Actions>


        <Button color="red" content="Close" onClick={modalStore.closeModal} />

      </Modal.Actions>
    </>

  );
});
