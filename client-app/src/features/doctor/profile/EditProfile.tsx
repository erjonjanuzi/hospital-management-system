import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Grid, Header, Input, Label, Message, Radio, Select } from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { RegisterDoctor } from '../../../app/models/user';
import { useEffect } from 'react';
import DateInput from '../../../app/common/form/DateInput';
import { useState } from 'react';
import { DoctorProfile } from '../../../app/models/profile';

interface Props {
    doctor: DoctorProfile
}

export default observer(function EditProfile({ doctor }: Props) {
    const { profileStore: { updateDoctor }, modalStore, countriesStore, specialtyStore, nationalitiesStore } = useStore();

    const maritalStatus = [
        { key: 'Single', value: 'Single', text: 'Single' },
        { key: 'Married', value: 'Married', text: 'Married' },
        { key: 'Widowed', value: 'Widowed', text: 'Widowed' },
        { key: 'Divorced', value: 'Divorced', text: 'Divorced' },
    ]

    let specialties = [
        { key: doctor.specialty.id, value: doctor.specialty.id, text: doctor.specialty.name }
    ];
    const insertSpecialties = async () => {
        await specialtyStore.loadSpecialties();
        for (let i = 0; i < specialtyStore.specialties.length; i++) {
            let specialty = {
                key: specialtyStore.specialties[i].id,
                value: specialtyStore.specialties[i].id,
                text: specialtyStore.specialties[i].name
            };
            specialties[i] = specialty;
        }
    }

    let countries = [
        { key: doctor.personalInfo.country.id, value: doctor.personalInfo.country.id, text: doctor.personalInfo.country.name }
    ];
    const insertCountries = async () => {
        await countriesStore.loadCountries();
        for (let i = 0; i < countriesStore.countries.length; i++) {
            let country = {
                key: countriesStore.countries[i].id,
                value: countriesStore.countries[i].id,
                text: countriesStore.countries[i].name
            };
            countries[i] = country;
        }
    }

    let cities = [
        { key: doctor.personalInfo.city.id, value: doctor.personalInfo.city.id, text: doctor.personalInfo.city.name }
    ];
    const insertCities = async (countryId: string) => {
        const country = countriesStore.countriesRegistry.get(countryId);
        const selectedCountryCities = country?.cities;
        if (selectedCountryCities != null) {
            for (let i = 0; i < selectedCountryCities.length; i++) {
                let city = {
                    key: selectedCountryCities[i].id,
                    value: selectedCountryCities[i].id,
                    text: selectedCountryCities[i].name
                };
                cities[i] = city;
            }
        }
    }

    let nationalities = [
        { key: doctor.personalInfo.nationality.id, value: doctor.personalInfo.nationality.id, text: doctor.personalInfo.nationality.name}
    ];
    const insertNationalities = async () => {
        await nationalitiesStore.loadNationalities();
        for (let i = 0; i < nationalitiesStore.nationalities.length; i++) {
            let nationality = {
                key: nationalitiesStore.nationalities[i].id,
                value: nationalitiesStore.nationalities[i].id,
                text: nationalitiesStore.nationalities[i].name
            };
            nationalities[i] = nationality;
        }
    }

    const registerDoctorDto: any = {
        id: doctor.id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        userName: doctor.userName,
        email: doctor.email,
        specialtyId: doctor.specialty.id,
        personalInfoId: doctor.personalInfo.id,
        personalNumber: doctor.personalInfo.personalNumber,
        dateOfBirth: doctor.personalInfo.dateOfBirth,
        gender: doctor.personalInfo.gender,
        phoneNumber: doctor.personalInfo.phoneNumber,
        address: doctor.personalInfo.address,
        countryId: doctor.personalInfo.country.id,
        cityId: doctor.personalInfo.city.id,
        nationalityId: doctor.personalInfo.nationality.id,
        maritalStatus: doctor.personalInfo.maritalStatus,
        error: null
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email().required('A valid email is required'),
        userName: Yup.string().required('Username is required'),
        specialtyId: Yup.string().required('Specialty is required'),
        personalNumber: Yup.string().required('Personal number is required'),
        cityId: Yup.string().required('Pick a city'),
        address: Yup.string().required('Address is required'),
        phoneNumber: Yup.string().required('Enter a phone number').min(9).max(12),
        nationalityId: Yup.string().required('Nationality is required'),
        maritalStatus: Yup.string().required('Marital status is required')
    })

    useEffect(() => {
        insertSpecialties();
        insertCountries();
        insertNationalities();
    }, [specialties, countries])

    return (
        <>
            <Header as='h1' content='Edit profile information' />
            <Divider />
            <Formik
                initialValues={registerDoctorDto}
                onSubmit={(values, { setErrors }) => updateDoctor(values).catch(error =>
                setErrors({ error }))}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <ErrorMessage
                            name='error' render={() =>
                                <Message negative content={errors.error} />}
                        />
                        <Grid>
                            <Grid.Column width='8'>
                                <Label content='First Name' color='blue' basic />
                                <MyTextInput name='firstName' placeholder='First name' />
                                <Label content='Last Name' color='blue' basic />
                                <MyTextInput name='lastName' placeholder='Last name' />
                                <Label content='Username' color='blue' basic />
                                <MyTextInput name='userName' placeholder='Username' />
                                <Label content='Email' color='blue' basic />
                                <MyTextInput name='email' placeholder='Email' />
                                <Label content='Doctor specialty' color='blue' basic />
                                <MySelectInput name='specialtyId' placeholder='Specialty' options={specialties} />
                            </Grid.Column>
                            <Grid.Column width='8'>
                                <Label content='Country' color='blue' basic /><br />
                                <Select options={countries} placeholder='Country' name='countryId'
                                    onChange={(values, data) => insertCities((data.value!).toString())} fluid />
                                <br />
                                <Label content='City' color='blue' basic />
                                <MySelectInput options={cities} placeholder='City' name='cityId' />
                                <Label content='Address' color='blue' basic />
                                <MyTextInput name='address' placeholder='Address' />
                                <Label content='Phone number' color='blue' basic />
                                <MyTextInput name='phoneNumber' placeholder='Phone number' />
                                <Label content='Nationality' color='blue' basic />
                                <MySelectInput options={nationalities} placeholder='Nationality' name='nationalityId' />
                                <Label content='Marital status' color='blue' basic />
                                <MySelectInput options={maritalStatus} placeholder='Marital status' name='maritalStatus' />
                            </Grid.Column>
                        </Grid>
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