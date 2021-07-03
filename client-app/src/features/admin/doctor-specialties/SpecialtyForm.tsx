import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Divider, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { toast } from 'react-toastify';
import MyTextArea from '../../../app/common/form/MyTextArea';

export default observer(function SpecialtyForm() {
    const { modalStore, specialtyStore: {createSpecialty} } = useStore();

    const validationSchema = Yup.object({
        name: Yup.string().required('Specialty name is required'),
        description: Yup.string().required('Please provide a description of the specialty')
    })

    return (
        <>
            <Formik
                initialValues={{name: '', description: '' }}
                onSubmit={values => createSpecialty(values).catch(error => console.log(error)).then(modalStore.closeModal)}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Label content='Specialty name' /><br />
                        <MyTextInput name='name' placeholder='Specialty Name' />
                        <Label content='Description' /><br />
                        <MyTextArea rows={4} name='description' placeholder='Description' />
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