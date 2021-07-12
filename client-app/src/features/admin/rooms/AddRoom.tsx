import { ErrorMessage, Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import {
  Button,
  Divider,
  Header,
  Message,
} from "semantic-ui-react";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import { useEffect } from "react";


export default observer(function AddRoom() {
  const { roomStore, modalStore, departmentStore, patientStore } = useStore();


  let departments = new Array();
  const insertDepartments = async () => {
    await departmentStore.loadDepartments();
    for (let i = 0; i < departmentStore.departments.length; i++) {
      let department = {
        key: departmentStore.departments[i].id,
        value: departmentStore.departments[i].name,
        text: departmentStore.departments[i].name,
      };
      departments[i] = department;
    }
  };

  let patients = new Array();
  const insertPatients = async () => {
    await patientStore.loadPatients();
    for (let i = 0; i < patientStore.patients.length; i++) {
      let patient = {
        key: patientStore.patients[i].id,
        value:
          patientStore.patients[i].firstName +
          "  " +
          patientStore.patients[i].lastName,
        text:
          patientStore.patients[i].firstName +
          "  " +
          patientStore.patients[i].lastName,
      };
      patients[i] = patient;
    }
  };

  const selectedRoom = {
    roomNo: "",
    roomType: "",
    floor: "",
    department: "",
    patient: "",
    error: null,
  };

  useEffect(() => {
    insertDepartments();
    insertPatients();
  }, [patients, departments]);

  const types = [
    { key: "1", text: "Critical Care Unit", value: "Critical Care Unit" },
    { key: "2", text: "Critical Room", value: "Critical Room" },
    { key: "3", text: "Emergency Unit", value: "Emergency Unit" },
    {
      key: "4",
      text: "Intensive Treatment Unit",
      value: "Intensive Treatment Unit",
    },
  ];
  const floors = [
    { key: "1", text: "Ground Floor", value: "Ground Floor" },
    { key: "2", text: "1st Floor", value: "1st Floor" },
    { key: "3", text: "2nd Floor", value: "2nd Floor" },
    { key: "4", text: "3rd Floor", value: "3rd Floor" },
  ];

  const validationSchema = Yup.object({
    roomNo: Yup.string().required("RoomNo is required"),
    roomType: Yup.string().required("Room Type is required"),
    floor: Yup.string().required("Flooe is required"),
    department: Yup.string().required("Please select the department"),
    patient: Yup.string().required("Please select the patient"),
  });

  return (
    <>
      <Header as="h1" content="Add Room" />
      <Divider />
      <Formik
        initialValues={selectedRoom}
        onSubmit={(values, { setErrors }) =>
          roomStore.createRoom(values).catch((error) => setErrors({ error }))
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
            <Header sub content="Room No." />
            <MyTextInput name="roomNo" placeholder="RoomNo" />
            <Header sub content="Room Type" />
            <MySelectInput
              name="roomType"
              placeholder="Room Type"
              options={types}
            />
            <Header sub content="Floor" />
            <MySelectInput name="floor" placeholder="Floor" options={floors} />
            <Header sub content="Department" />
            <MySelectInput
              options={departments}
              placeholder="Department"
              name="department"
            />
            <Header sub content="Patient" />
            <MySelectInput
              options={patients}
              placeholder="Patient"
              name="patient"
            />

            <Divider />
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
