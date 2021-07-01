import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import {
  Button,
  Divider,
  Header,
  List,
  Modal,
  Segment
} from "semantic-ui-react";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";

interface Props {
  id: string;
}

export default observer(function EditVacciantion({ id }: Props) {
  const {
    vaccinationStore: { loadVaccine, selectedVaccine, updateVaccine },
    modalStore,
  } = useStore();

  useEffect(() => {
    if (id) loadVaccine(id);
  }, [id, loadVaccine]);

  const vaccineRecived = [
    {key: 'phizer', value: 'pfizer', text: 'Pfizer'},
    {key: 'moderna', value: 'moderna', text: 'Moderna'},
    {key: 'johnson', value: 'johnson', text: 'Johnson and Johnson'},
    {key: 'astra', value: 'astrazeneca', text: 'AstraZeneca'},
    {key: 'other', value: 'other', text: 'Another Product'}
]


const wantedVaccine = [
  {key: 'phizer', value: 'Pfizer', text: 'Pfizer'},
  {key: 'moderna', value: 'Moderna', text: 'Moderna'},
  {key: 'johnson', value: 'Johnson and Johnson', text: 'Johnson and Johnson'},
  {key: 'astra', value: 'AstraZeneca', text: 'AstraZeneca'},
  {key: 'other', value: 'Another Product', text: 'Another Product'}

]
const allergies = [
  {key: 'glycon', value: 'Polyethylene glycol (PEG)', text: 'Polyethylene glycol (PEG)'},
  {key: 'polysorbate', value: 'Polysorbate', text: 'Polysorbate'},
  {key: 'previous', value: 'A previous dose of COVID-19 vaccine', text: 'A previous dose of COVID-19 vaccine'}
]

  return (
    <>
      <Header as="h1" content="Edit patient informations" />
      <Divider />
      <Formik
        initialValues={selectedVaccine!}
        onSubmit={(values) =>
          updateVaccine(values).catch((error) => console.log(error))
        }
        enableReinitialize
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Header content="Patient details" />
            <Divider />
            <Segment clearing>
              <Modal.Content>
                <List.Item>
                    <MyTextInput label="First Name" name="firstName" placeholder="First Name" />
                    <MyTextInput label="Last Name" name="lastName" placeholder="Last Name" />
                    <MyTextInput label="Age" name="age" placeholder="Age" />
                  <Divider/>
                    <MyTextInput name="email" label="email" placeholder="Email" />
                    <MyTextInput name="date" label="date" placeholder="Date" type="date" />
                {/* <Divider /> */}
                  {/* <MyTextInput label="1. How are you feeling" name="ds" placeholder="how are you feeling"/> */}
                </List.Item>

                <Divider />
                <MySelectInput label="1. Have you ever received a dose of COVID-19 vaccine?" placeholder="Recevied vaccine" name="recived" options={vaccineRecived!} />

                <Divider />
                <MySelectInput label="2. Which COVID-19 vaccine do you want to receive?" placeholder="Wanted vaccine" name="vaccine" options={wantedVaccine} />
                <Divider />
                <MySelectInput label="3. Have you ever had an allergic reaction to:" placeholder="Allegies" name="allegies" options={allergies} />
                <Divider />
                {/* <MySelectInput label="4. Select what applys to you" placeholder="Addition info" name="applies" options={info} /> */}
                <MyTextArea
                            placeholder='Comment here...'
                            rows={3}
                            name='comment'
                            label='You can leave a comment here (Optional)'
                        />
                {/* <Divider /> */}
                {/* <MySelectInput label="6. Is this your first or second dosage of the vaccine?" name="dose" placeholder="Dose" options={desc}/>               */}

                     
              </Modal.Content>
            </Segment>
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              positive
              type="submit"
              content="Submit"
            />
            <Button
              basic
              color="red"
              content="Cancel"
              onClick={modalStore.closeModal}
            />
          </Form>
        )}
      </Formik>
    </>
  );
});
