import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import {
  Button,
  Divider,
  Header,
  List,
  Message,
  Modal,
  Segment,
} from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";

export default observer(function CreatePatient() {
  const { patientStore, modalStore } = useStore();

  const selectedPatient = {
    firstName: "",
    lastName: "",
    age: "",
    registeredSince: "",
    email: "",
    status: "",
    error: null,
    role: "",
    username: "",
    diagnosis: "",
    analysis: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    age: Yup.string().required("Age is required"),
    registeredSince: Yup.date().required("Please pick a date"),
    email: Yup.string().email().required("A valid email is required"),
    status: Yup.string().required("Status is required"),
  });
  return (
    <>
      <Header as="h1" content="Add a new patient" />
      <Divider />
      <Formik
        initialValues={selectedPatient}
        onSubmit={(values, { setErrors }) =>
          patientStore.create(values).catch((error) => setErrors({ error }))
        }
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <ErrorMessage
              name="error"
              render={() => <Message negative content={errors.error} />}
            />
            <Header content="Patient details" />
            <Divider />
            <Segment clearing>
              <Modal.Content>
                <Header as="h4" content="Patient information" />
                <List.Item>
                  <MyTextInput name="firstName" placeholder="First Name" />
                </List.Item>
                <List.Item>
                  <MyTextInput name="lastName" placeholder="Last Name" />
                </List.Item>
                <List.Item>
                  <MyTextInput name="age" placeholder="Age" />
                </List.Item>
                <Divider />
                <List.Item>
                  <MyTextInput name="registeredSince" type="date" placeholder="registeredSince" />
                </List.Item>
                <List.Item>
                  <MyTextInput name="email" type="email" placeholder="Email" />
                </List.Item>
                <List.Item>
                  <MyTextInput name="status" placeholder="Status" />
                </List.Item>
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
