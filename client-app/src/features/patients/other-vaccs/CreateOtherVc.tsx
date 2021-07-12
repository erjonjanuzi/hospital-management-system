import { Formik, Form, Field } from "formik";
import { observer } from "mobx-react-lite";
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


export default observer(function CreateOtherVc() {
  const { otherVaccsStore: { create }, modalStore } = useStore();

  const selectedVaccine = {
    firstName: "",
    lastName: "",
    age: "",
    feeling: "",
    symptoms: "",
    vaccineType: "",
    error: null
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    age: Yup.string().required("Age is required"),
    symptoms: Yup.string().required("Symptoms are required"),
    vaccineType: Yup.string().required("Vaccine is required"),
  });

  const type = [
    { key: "1", value: "Tetanus and Diphtheria (Td)", text: "Tetanus and Diphtheria (Td)" },
    { key: "2", value: "Shingles", text: "Shingles" },
    { key: "3", value: "Influenza (flu)", text: "Influenza (flu)", },
    { key: "4", text: "Pneumococcal", value: "Pneumococcal" },
    { key: "5", text: "Hepatitis A ", value: "Hepatitis A" },
    { key: "6", text: "HPV (human papillomavirus) ", value: "HPV (human papillomavirus) " },
    { key: "7", text: "Chicken pox (varicella)", value: "Chicken pox (varicella)" },
  ];

  return (
    <>
      <Header as="h1" content="Vaccination Form" />
      <Divider />
      <Formik
        initialValues={selectedVaccine}
        onSubmit={values => create(values).catch(error => console.log(error)).then(modalStore.closeModal)}
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
              </List.Item>

              <Divider />
              <Header as="h4">
                {" "}
                1. Are you moderately or severely ill today?
              </Header>
              <label>
                <Field type="radio" name="feeling" value="Yes" />
                Yes
              </label>
              <label style={{ marginLeft: "10px" }}>
                <Field type="radio" name="feeling" value="No" />
                No
              </label>
              <Divider />
              <Header as="h4">
                2. Do you have any symptoms?
              </Header>
              <MyTextInput name="symptoms" placeholder='Symptoms that you might have' />
              <Header as="h4">
                3. Which vaccine do you want to receive?
              </Header>
              <MySelectInput
                placeholder="Choose the vaccine"
                name="vaccineType"
                options={type}
              />
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
