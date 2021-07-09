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
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useStore } from "../../../app/stores/store";

interface Props {
  id: string;
}

export default observer(function EditAnalysis({ id }: Props) {
  const {
    accountManagementStore: { loadAccount, selectedAccount },
    analysisStore: { loadAnalysis, selectedAnalyse, updateAnalyse },
    modalStore,
  } = useStore();

  useEffect(() => {
    if (id) loadAnalysis(id);
  }, [id, loadAccount]);

  return (
    <>
      <Header as="h1" content="Edit Analyse Informations" />
      <Divider />
      <Formik
        initialValues={selectedAnalyse!}
        onSubmit={(values) =>
          updateAnalyse(values).catch((error) => console.log(error))
        }
        enableReinitialize
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
           <Segment clearing>
                        <Modal.Content>
                        <Header sub content='Analyse' />
                        <MyTextInput name='eritrocite' placeholder='Eritrocite' />
                        <MyTextInput name='hemoglobina' placeholder='Hemoglobina' />
                        <MyTextInput name='leukocite' placeholder='Leukocite' />
                        <MyTextInput name='hemakrotiti' placeholder='Hemakrotiti' />
                        <MyTextInput name='tromobocite' placeholder='Tromobocite' />
                        <MyTextInput name='retikulocite' placeholder='Retikulocite' />
                        <MyTextInput name='neutrofile' placeholder='Neutrofile' />
                        <MyTextInput name='limfocite' placeholder='Limfocite' />
                        <MyTextInput name='monocite' placeholder='Monocite' />
                        <MyTextInput name='urea' placeholder='Urea' />
                        <MyTextInput name='glukoza' placeholder='Glukoza' />
                        <MyTextInput name='kolesteroli' placeholder='Kolesteroli' />
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
