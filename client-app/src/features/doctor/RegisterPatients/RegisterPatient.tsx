import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { Header, Divider, Form, Message, Button, Segment } from "semantic-ui-react";
import { ErrorMessage, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import Breadcrumbs from "../../../app/layout/Breadcrumbs";



export default observer(function RegisterPatient() {
    const { registerPatientStore, modalStore } = useStore();

    const selectedPharmacy = {
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        about: '',
        allergic: '',
        error: null,
    }
    const gender = [
        { key: 'm', value: 'M', text: 'M' },
        { key: 'f', value: 'F', text: 'F' },
        { key: 'other', value: 'Other', text: 'Other' }
    ]
    const allergic = [
        { key: 'yes', value: 'Yes', text: 'Yes' },
        { key: 'no', value: 'No', text: 'No' },
    ]
    return (
        <>
            <Segment.Group>
                <Segment>
                    <Breadcrumbs />
                </Segment>
                <Segment>
                    <Header as='h1' content='Register patient' />
                </Segment>
            </Segment.Group>
            <Segment>
                <Formik
                    initialValues={selectedPharmacy}
                    onSubmit={(values, { setErrors }) => registerPatientStore.registerPatient(values).catch(error =>
                        setErrors({ error }))}
                    enableReinitialize
                >
                    {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <ErrorMessage
                                name='error' render={() =>
                                    <Message negative content={errors.error} />}
                            />
                            <Form.Group widths={2}>
                                <MyTextInput name='firstName' placeholder='First Name' label="First Name:" />
                                <MyTextInput name='lastName' placeholder='Last Name' label="First Name:" />
                            </Form.Group>
                            <Form.Group widths={2}>
                                <MySelectInput name='gender' placeholder='Gender' label="Gender:" options={gender} />
                                <MyTextInput name='phone' placeholder='Phone' label="Phone:" />
                            </Form.Group>
                            <Form.Group widths={3}>
                                <MyTextInput name='email' placeholder='Email' label="Email:" />
                                <MyTextInput name='address' placeholder='Address' label="Address:" />
                                <MyTextInput name='about' placeholder='About' label="About:" />
                            </Form.Group>
                            <Form.Group widths={3}>
                                <MySelectInput name='allergic' placeholder='Allergic' label="Allergic:" options={allergic} />
                            </Form.Group>
                            <Divider />
                            <Button disabled={isSubmitting || !dirty || !isValid}
                                loading={isSubmitting} positive type='submit' content='Register'
                            />
                        </Form>
                    )}

                </Formik>
            </Segment>
        </>
    )
})