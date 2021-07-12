import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Divider, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import RegisterCityForm from './RegisterCityForm';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { toast } from 'react-toastify';

interface Props {
    id: string;
}

export default observer(function ViewCountry({ id }: Props) {
    const { countriesStore, modalStore } = useStore();
    const { loadCountry, selectedCountry, deleteCity, updateCountry, selectedCity, loadCity, updateCity } = countriesStore;

    const [editMode, setEditMode] = useState(false);
    const [cityEdit, setCityEdit] = useState(false);

    const validationSchema = Yup.object({
        id: Yup.string().required('Country abbreviation is required'),
        name: Yup.string().required('Country name is required')
    })

    const cityValidationSchema = Yup.object({
        name: Yup.string().required('City name is required'),
        zip: Yup.string().required('Zip code is required')
    })

    function handleCityEdit(id: string) {
        if (id) loadCity(id);
        setCityEdit(true);
    }

    useEffect(() => {
        if (id) loadCountry(id);
    }, [id, loadCountry]);

    return (
        <>
            <Header content='Country details' />
            <Divider />
            {editMode ?
                <>
                    <Formik
                        initialValues={selectedCountry!}
                        onSubmit={values => updateCountry(values).catch(error => toast.error("Error"))
                            .then(modalStore.closeModal)}
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
                                <Button disabled={isSubmitting || !dirty || !isValid}
                                    loading={isSubmitting} positive type='submit' content='Submit'
                                />
                                <Button basic color='red' content='Cancel' onClick={() => setEditMode(false)} />
                            </Form>
                        )}
                    </Formik>
                </> :
                <>
                    <Label content='Country Abbreviation' /><br />
                    <span>{selectedCountry?.id}</span><br /><br />
                    <Label content='Country Name' /><br />
                    <span>{selectedCountry?.name}</span><br /><br />
                    <Label content='Number of cities' /><br />
                    <span>{selectedCountry?.cities ? selectedCountry.cities.length : 0}</span><br /><br />
                    <Button content='Edit' color='facebook' icon='edit outline' onClick={() => setEditMode(true)} />
                </>
            }
            <Divider />
            {selectedCountry?.cities == null ?
                <Segment placeholder>
                    <Header icon>
                        <Icon name='x' />
                        No cities registered in this country <br />
                    </Header>
                    <Button positive content='Add city' icon='plus'
                        onClick={() => modalStore.openModal(<RegisterCityForm country={selectedCountry!} />)} />
                </Segment>
                :
                <>
                    <Header content='Cities in this country' />
                    <Button positive content='Add city' icon='plus'
                        onClick={() => modalStore.openModal(<RegisterCityForm country={selectedCountry!} />)} />
                    {cityEdit ?
                        <>
                            <Formik
                                initialValues={selectedCity!}
                                onSubmit={values => updateCity(values).then(() => setCityEdit(false))}
                                validationSchema={cityValidationSchema}
                                enableReinitialize
                            >
                                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                        <Divider />
                                        <Header sub content='City details' />
                                        <Label content='City name' /><br />
                                        <MyTextInput name='name' placeholder='City Name' />
                                        <Label content='Zip Code' /><br />
                                        <MyTextInput name='zip' placeholder='Zip Code' />
                                        <Button disabled={isSubmitting || !dirty || !isValid}
                                            loading={isSubmitting} positive type='submit' content='Submit'
                                        />
                                        <Button content='Cancel' onClick={() => setCityEdit(false)} />
                                    </Form>
                                )}
                            </Formik>
                        </>
                        :
                        <>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>City Name</Table.HeaderCell>
                                        <Table.HeaderCell>Zip Code</Table.HeaderCell>
                                        <Table.HeaderCell>Options</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {selectedCountry?.cities.map(city => (
                                        <Table.Row key={city.id}>
                                            <Table.Cell>{city.name}</Table.Cell>
                                            <Table.Cell>{city.zip}</Table.Cell>
                                            <Table.Cell>
                                                <Button content='Edit' color='facebook' onClick={() => handleCityEdit(city.id!)} />
                                                <Button content='Delete' basic negative onClick={() => deleteCity(city.id!).then(modalStore.closeModal)} />
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </>
                    }
                </>
            }
        </>
    )
})