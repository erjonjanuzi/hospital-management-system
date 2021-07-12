import { ErrorMessage, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Form, Header, Message, Modal, Segment } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';

interface Props {
    id: string
}

export default observer(function CreateAnalysis({ id }: Props) {

    const { analysisStore, modalStore } = useStore();

    const selectedAnalyse = {
        eritrocite: '',
        hemoglobina: '',
        leukocite: '',
        hemakrotiti: '',
        tromobocite: '',
        retikulocite: '',
        neutrofile: '',
        limfocite: '',
        monocite: '',
        urea: '',
        glukoza: '',
        kolesteroli: '',
        patientsId: id,
        error: null
    }

    // const validationSchema = Yup.object({
    //     eritrocite: Yup.string().required('eritrocite is required'),
    //     glukoza: Yup.string().required('glukoza is required'),
    //     // leukocite: Yup.string().required('leukocite is required'),
    //     // hemakrotiti: Yup.string().required('hemakrotiti is required'),
    //     // tromobocite: Yup.string().required('tromobocite is required')
    // })

    return (
        <>
            <Header as='h1' content='Add a new Anlaysis' />
            <Divider />
            <Formik
                initialValues={selectedAnalyse}
                onSubmit={(values, { setErrors }) => analysisStore.createAnalyse(values).catch(error =>
                    setErrors({ error }))}
                // validationSchema={validationSchema}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <ErrorMessage
                            name='error' render={() =>
                                <Message negative content={errors.error} />}
                        />
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