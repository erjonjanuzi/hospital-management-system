import { ErrorMessage, Formik, Form, Field } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import {Button,Checkbox,Divider,Header,List,Message,Modal,Segment,} from "semantic-ui-react";
import * as Yup from "yup";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";

export default observer(function CreateVaccination() {
  const { vaccinationStore, modalStore } = useStore();

  const selectedVaccine = {
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    date: '',
    received: '',
    vaccine: '',
    allergies: '',
    information: '',
    error: null,
  };

  // const vaccineRecived = [
  //     {key: 'phizer', value: 'pfizer', text: 'Pfizer'},
  //     {key: 'moderna', value: 'moderna', text: 'Moderna'},
  //     {key: 'johnson', value: 'johnson', text: 'Johnson and Johnson'},
  //     {key: 'astra', value: 'astrazeneca', text: 'AstraZeneca'},
  //     {key: 'other', value: 'other', text: 'Another Product'}
  // ]


  const wantedVaccine = [
    {key: 'phizer', value: 'Pfizer', text: 'Pfizer'},
    {key: 'moderna', value: 'Moderna', text: 'Moderna'},
    {key: 'johnson', value: 'Johnson and Johnson', text: 'Johnson and Johnson'},
    {key: 'astra', value: 'AstraZeneca', text: 'AstraZeneca'},
    {key: 'other', value: 'Another Product', text: 'Another Product'}

]
const option = [
    {key: '1', value: 'polyethylene glycol', text: 'Polyethylene glycol'},
    {key: '2', value: 'polysorbate', text: 'polysorbate'},
    {key: '3', value: 'a previous dose of covid-19 vaccine', text: 'A previous dose of COVID-19 vaccine'},
    {key: '4', text: 'none', value: 'None' },

]

  return (
    <>
      <Header as="h1" content="COVID-19 Vaccination Form" />
      <Divider />
      <Formik
        initialValues={selectedVaccine}
        onSubmit={(values, { setErrors }) =>
          vaccinationStore.createVaccination(values).catch((error) => setErrors({ error }))
        }
        // validationSchema={validationSchema}
        enableReinitialize
      >
        {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <ErrorMessage
              name="error"
              render={() => <Message negative content={errors.error} />}
            />
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
                <Header as='h4'> 1. Have you received the first dose of the vaccine?</Header>
                        <label>
                                    <Field type="radio" name="received" value="Yes" />
                                    Yes
                                </label>
                                <label style={{ marginLeft: '10px' }}>
                                    <Field type="radio" name="received" value="No" />
                                    No
                                </label>
                <Divider />
                <MySelectInput label="2. Which COVID-19 vaccine do you want to receive?" placeholder="Wanted vaccine" name="vaccine" options={wantedVaccine} />
                <Divider />
                <Header as='h4'>4.Have you ever had an allergic reaction to:</Header>
                        <MySelectInput name='allergies' placeholder='allergies' options={option}/>
                <Divider />
                <Header as='h4'>4. Do you struggle with any chronic diseases? </Header>
                        <MyTextInput name='information'/>            
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
