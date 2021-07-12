import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useStore } from '../../../app/stores/store';
import { Form, Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';

export default observer(function RegisterNationalityForm() {
    const { modalStore, nationalitiesStore: { createNationality } } = useStore();

    const validationSchema = Yup.object({
        name: Yup.string().required('Nationality is required')
    })

    return (
        <>
            <Header as='h1' content='Add new nationality' />
            <Divider />
            <Formik
                initialValues={{ name: '' }}
                onSubmit={values => createNationality(values).catch(error => console.log(error)).then(modalStore.closeModal)}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='Country details' />
                        <Label content='Nationality' /><br />
                        <MyTextInput name='name' placeholder='Nationality' />
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