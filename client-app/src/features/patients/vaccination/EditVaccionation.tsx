import { Field, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from 'react';
import { Button, Divider, Form, Header } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from '../../../app/common/form/MySelectInput';
import { useStore } from "../../../app/stores/store";

interface Props {
  id: string
}

export default observer(function EditVaccionation({ id }: Props) {

  const { vaccinationStore: { loadVaccine, selectedVaccine, updateVaccine }, modalStore } = useStore();

  useEffect(() => {
    if (id) loadVaccine(id);
  }, [id, loadVaccine]);

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
    { key: "2", value: "polysorbate", text: "polysorbate" },
    {
      key: "3",
      value: "a previous dose of covid-19 vaccine",
      text: "A previous dose of COVID-19 vaccine",
    },
    { key: "4", text: "none", value: "None" },
  ];

  return (
    <>
      <Header as='h1' content='Edit Vaccination Form ' />
      <Divider />
      <Formik
        initialValues={selectedVaccine!}
        onSubmit={(values) => updateVaccine(values).catch(error => console.log(error))}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput label="First Name" name="firstName" placeholder="First Name" />
            <MyTextInput label="Last Name" name="lastName" placeholder="Last Name" />
            <MyTextInput label='Age' name='age' placeholder='Age' />
            <MyTextInput name="email" label="Email" type='email' placeholder="Email" />
            <MyTextInput name="date" label="date" placeholder="Date" type="date" />
            <Header as="h5">
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
            <MySelectInput placeholder="Wanted vaccine" name="vaccine" options={wantedVaccine} />
            <MySelectInput name="allergies" placeholder="allergies" options={option} />
            <MyTextInput name="information" placeholder='Chronic diseases' />

            <Divider />
            <Button disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting} positive type='submit' content='Submit'
            />
            <Button basic color='red' content='Cancel' onClick={modalStore.closeModal} />
          </Form>
        )}
      </Formik>
    </>
  )
})