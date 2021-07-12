import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Divider, Grid, Header, Label, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';

interface Props {
    id: string;
}

export default observer(function ViewSpecialty({ id }: Props) {
    const { specialtyStore, modalStore } = useStore();
    const { loadSpecialty, selectedSpecialty, editSpecialty } = specialtyStore;

    const [editMode, setEditMode] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required('Specialty name is required'),
        description: Yup.string().required('Please provide a description of the specialty')
    })

    useEffect(() => {
        if (id) loadSpecialty(id);
    }, [id, loadSpecialty]);

    return (
        <>
            <Header content='Specialty details' />
            <Divider />
            {editMode ?
                <>
                    <Formik
                        initialValues={selectedSpecialty!}
                        onSubmit={values => editSpecialty(values).catch(error => console.log(error))
                            .then(modalStore.closeModal)}
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
                                <Button basic color='red' content='Cancel' onClick={() => setEditMode(false)} />
                            </Form>
                        )}
                    </Formik>
                </> :
                <>
                    <Grid>
                        <Grid.Column width='14'>
                            <Table basic='very' collapsing >
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Label basic content='Specialty' />
                                        </Table.Cell>
                                        <Table.Cell>{selectedSpecialty?.name}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Label basic content='Description' />
                                        </Table.Cell>
                                        <Table.Cell>{selectedSpecialty?.description}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <Button color='red' icon='edit' basic onClick={() => setEditMode(true)} />
                        </Grid.Column>
                    </Grid>
                    {!editMode &&
                        <>
                            <Divider />
                            <Button onClick={modalStore.closeModal} content='Close' />
                        </>
                    }
                </>
            }
        </>
    )
})