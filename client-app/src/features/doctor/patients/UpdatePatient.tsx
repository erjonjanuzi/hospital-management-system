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
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";

interface Props {
  id: string;
}

export default observer(function ViewPatient({ id }: Props) {
  const {
    patientStore: { loadPatient, selectedPatient, updatePatient },
    modalStore,
  } = useStore();

  useEffect(() => {
    if (id) loadPatient(id);
  }, [id, loadPatient]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email().required("A valid email is required"),
    age: Yup.string().required("Age is required"),
  });
  return (
    <>
      <Header as="h1" content="Edit patient informations" />
      <Divider />
      <Formik
        initialValues={selectedPatient!}
        onSubmit={(values) =>
          updatePatient(values).catch((error) => console.log(error))
        }
        enableReinitialize
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Header content="Patient details" />
            <Divider />
            <Segment clearing>
              <Modal.Content>
                <Header as="h4" content="Patient information" />
                <List.Item>
                  <List.Header>
                    First Name:
                    <MyTextInput name="firstName" placeholder="First Name" />
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Last Name:
                    <MyTextInput name="lastName" placeholder="Last Name" />
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Age:
                    <MyTextInput name="age" placeholder="Age" />
                  </List.Header>
                </List.Item>
                <Divider />
                <List.Item>
                  <List.Header>
                    Email:
                    <MyTextInput
                      name="email"
                      type="email"
                      placeholder="Email"
                    />
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Status:
                    <MyTextInput name="status" placeholder="Status" />
                  </List.Header>
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
