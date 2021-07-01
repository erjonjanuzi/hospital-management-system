import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Divider, Header, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useStore } from '../../../app/stores/store';
import { ErrorMessage, Form, Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { Country } from '../../../app/models/city';
import ViewCountry from './ViewCountry';
import { toast } from 'react-toastify';

interface Props {
    country: Country;
}

export default observer(function RegisterCityForm({country}: Props) {
    const { modalStore, countriesStore } = useStore();
    const { createCity } = countriesStore;

    const validationSchema = Yup.object({
        name: Yup.string().required('City name is required'),
        zip: Yup.string().required('Zip code is required')
    })

    return (
        <>
            <Header as='h1' content={`Add new city in ${country.name}`} />
            <Divider />
            <Formik
                initialValues={{name: '', zip: '', countryId: country.id}}
                onSubmit={values => createCity(values).then(modalStore.closeModal)}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='City details' />
                        <Label content='City name' /><br />
                        <MyTextInput name='name' placeholder='City Name' />
                        <Label content='Zip Code' /><br />
                        <MyTextInput name='zip' placeholder='Zip Code' />
                        <Divider />
                        <Button disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} positive type='submit' content='Submit'
                        />
                        <Button basic color='red' content='Cancel' 
                            onClick={() => modalStore.openModal(<ViewCountry id={country.id} />)} />
                    </Form>
                )}
            </Formik>
        </>

    )
})