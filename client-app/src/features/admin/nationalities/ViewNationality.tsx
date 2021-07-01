import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Divider, Header, Label } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';

interface Props {
    id: string;
}

export default observer(function ViewNationality({ id }: Props) {
    const { nationalitiesStore, modalStore } = useStore();
    const { loadNationality, selectedNationality, updateNationality } = nationalitiesStore;

    const [editMode, setEditMode] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required('Nationality is required')
    })

    useEffect(() => {
        if (id) loadNationality(id);
    }, [id, loadNationality]);

    return (
        <>
            <Header content='Nationality details' />
            <Divider />
            {editMode ?
                <>
                    <Formik
                        initialValues={selectedNationality!}
                        onSubmit={values => updateNationality(values).catch(error => console.log(error))
                            .then(modalStore.closeModal)}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                <Header sub content='Nationality details' />
                                <Label content='Nationality' /><br />
                                <MyTextInput name='name' placeholder='Nationality' />
                                <Button disabled={isSubmitting || !dirty || !isValid}
                                    loading={isSubmitting} positive type='submit' content='Submit'
                                />
                                <Button basic color='red' content='Cancel' onClick={() => setEditMode(false)} />
                            </Form>
                        )}
                    </Formik>
                </> :
                <>
                    <Label content='Nationality ID' /><br />
                    <span>{selectedNationality?.id}</span><br /><br />
                    <Label content='Nationality' /><br />
                    <span>{selectedNationality?.name}</span><br /><br />
                    <Button content='Edit' color='facebook' icon='edit outline' onClick={() => setEditMode(true)} />
                </>
            }
            <Divider />
        </>
    )
})