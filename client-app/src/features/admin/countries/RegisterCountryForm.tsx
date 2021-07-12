import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useStore } from '../../../app/stores/store';
import { Form, Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { toast } from 'react-toastify';

export default observer(function RegisterCountryForm() {
    const { modalStore, countriesStore: { createCountry } } = useStore();

    const validationSchema = Yup.object({
        id: Yup.string().required('Country abbreviation is required'),
        name: Yup.string().required('Country name is required')
    })

    return (
        <>
            <Header as='h1' content='Add new country' />
            <Divider />
            <Formik
                initialValues={{ id: '', name: '' }}
                onSubmit={values => createCountry(values).catch(error => toast.error(error)).then(modalStore.closeModal)}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='Country details' />
                        <Label content='Country abbreviation' /><br />
                        <MyTextInput name='id' placeholder='Country abbreviation' />
                        <Label content='Country Name' /><br />
                        <MyTextInput name='name' placeholder='Country Name' />
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