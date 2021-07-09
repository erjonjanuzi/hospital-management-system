import { ErrorMessage, Formik, Form, Field } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  Button,
  Divider,
  Header,
  List,
  Segment,
} from "semantic-ui-react";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";


export default observer(function CreateVaccination() {
  const { vaccinationStore: {createVaccination}, modalStore } = useStore();

  const selectedVaccine = {
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    date: "",
    received: "",
    vaccine: "",
    allergies: "",
    information: "",
    error: null,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    age: Yup.string().required("Age is required"),
    date: Yup.date().required("Please pick a date"),
    email: Yup.string().email().required("A valid email is required"),
    vaccine: Yup.string().required("vaccine is required"),
  });

  const wantedVaccine = [
    { key: "phizer", value: "Pfizer", text: "Pfizer" },
    { key: "moderna", value: "Moderna", text: "Moderna" },
    {
      key: "johnson",
      value: "Johnson and Johnson",
      text: "Johnson and Johnson",
    },
    { key: "astra", value: "AstraZeneca", text: "AstraZeneca" },
    { key: "other", value: "Another Product", text: "Another Product" },
  ];
  const option = [
    { key: "1", value: "polyethylene glycol", text: "Polyethylene glycol" },
    { key: "2", value: "Polysorbate", text: "polysorbate" },
    {
      key: "3",
      value: "A previous dose of covid-19 vaccine",
      text: "A previous dose of COVID-19 vaccine",
    },
    { key: "4", text: "none", value: "None" },
  ];

  return (
    <>
      <Header as="h1" content="COVID-19 Vaccination Form" />
      <Divider />
      <Formik
        initialValues={selectedVaccine}
        onSubmit={values => createVaccination(values).catch(error => console.log(error)).then(modalStore.closeModal)}
                validationSchema={validationSchema}
                enableReinitialize
      >
        {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Segment clearing>
                <List.Item>
                  <MyTextInput
                    label="First Name"
                    name="firstName"
                    placeholder="First Name"
                  />
                  <MyTextInput
                    label="Last Name"
                    name="lastName"
                    placeholder="Last Name"
                  />
                  <MyTextInput label="Age" name="age" placeholder="Age" />
                  <Divider />
                  <MyTextInput name="email" label="Email" type='email' placeholder="Email" />
                  <MyTextInput
                    name="date"
                    label="date"
                    placeholder="Date"
                    type="date"
                  />
                </List.Item>

                <Divider />
                <Header as="h4">
                  {" "}
                  1. Have you received the first dose of the vaccine?
                </Header>
                <label>
                  <Field type="radio" name="received" value="Yes" />
                  Yes
                </label>
                <label style={{ marginLeft: "10px" }}>
                  <Field type="radio" name="received" value="No" />
                  No
                </label>
                <Divider />
                <Header as="h4">
                2. Which COVID-19 vaccine do you want to receive?
                </Header>
                <MySelectInput
                  placeholder="Wanted vaccine"
                  name="vaccine"
                  options={wantedVaccine}
                />
                <Divider />
                <Header as="h4">
                  3.Have you ever had an allergic reaction to:
                </Header>
                <MySelectInput
                  name="allergies"
                  placeholder="allergies"
                  options={option}
                />
                <Divider />
                <Header as="h4">
                  4. Do you struggle with any chronic diseases?{" "}
                </Header>
                <MyTextInput name="information" placeholder='Chronic diseases' />
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
