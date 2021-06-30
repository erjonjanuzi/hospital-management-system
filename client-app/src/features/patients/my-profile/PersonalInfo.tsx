import { observer } from 'mobx-react-lite';
import React from 'react';
import { PersonalInfo } from '../../../app/models/personalInfo';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Card, Divider, Header, Item, ItemDescription, Segment } from 'semantic-ui-react';
import { ErrorMessage, Form, Formik } from 'formik';

export default observer(function PersonalInfo(){

    const { modalStore, userStore, personalInfoStore } =  useStore();
    
    const validationSchema = Yup.object({
        dateofbirth: Yup.string().required(' Date of birth is requred!'),
        gender: Yup.string().required(' Gender is requred!'),
        personalnumber: Yup.string().required(' Personal Number is requred!'),
    })

    const maritalStatus = [
        { key: 'single', value: 'single', text: 'Single' },
        { key: 'married', value: 'married', text: 'Married' },
        { key: 'divorced', value: 'divorced', text: 'Divorced' },
    ]

    const personalInfo: PersonalInfo = {
        id: '',
        dateofbirth: '',
        gender: '', 
        phonenumber: '',
        height: '',
        address: '',
        city: '',
        country: '',
        nationality: '',
        maritalstatus: '',
        patientsId: ''
    }

    return(
        <>
        <Header as='h1' content='Personal Information' />
        <Divider />
        <Formik 
            initialValues={personalInfo}
            validationSchema={validationSchema}
            onSubmit={(values) => personalInfoStore.editPersonalInfo(values).catch(error => console.log(error))}
            enableReinitialize
        />

        <Card>
            <Segment textAlign='center'>
                <Item.Header>
                    Emri
                </Item.Header>

                {/* <MySelectInput placeholder='maritalstatus' name='maritalstatus' options={maritalStatus} label='What is your marital status ? ' /> */}
            </Segment>
        </Card>
        </>
    );
})
    
