import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, Message ,Dropdown} from 'semantic-ui-react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import React, { useEffect } from 'react';
import * as Yup from 'yup';

export default observer(function AddRoom() {

    const{roomStore,modalStore,departmentStore,patientStore} = useStore();
    const {rooms,roomRegistry,loadRooms,deleteRoom} = roomStore
    const {departments,departmentRegistry,loadDepartments,deleteDepartment} = departmentStore
    const { patients, patientRegistry, GresaLoadPatients, deletePatient } = patientStore


    
    
    const selectedRoom ={
       
        roomNo : '',
        roomType:'',
        floor:'',
        department:'',
        patient:'',
        error : null
        
    }

    const types = [
        { key: '1', text: 'Critical Care Unit', value:'Critical Care Unit'  },
        { key: '2', text: 'Critical Room', value: 'Critical Room' },
        { key: '3', text: 'Emergency Unit', value: 'Emergency Unit' },
        { key: '4', text: 'Intensive Treatment Unit', value: 'Intensive Treatment Unit' },
        
      ]
      const floors = [
        { key: '1', text: 'Ground Floor', value:'Ground Floor'  },
        { key: '2', text: '1st Floor', value: '1st Floor' },
        { key: '3', text: '2nd Floor', value: '2nd Floor' },
        { key: '4', text: '3rd Floor', value: '3rd Floor' },
        
      ]
      
    const validationSchema = Yup.object({
        roomNo:Yup.string().required('RoomNo is required'),
       
    })

    return (

        <>
            <Header as='h1' content='Add Room' />
            <Divider />
            <Formik
                initialValues={selectedRoom}
                onSubmit={(values, { setErrors }) => roomStore.createRoom(values).catch(error =>
                setErrors({ error }))}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ handleSubmit, isValid, isSubmitting, dirty,errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <ErrorMessage
                            name='error' render={() =>
                            <Message negative content={errors.error} />}
                        />
                        <Header sub content='details' />
                        <MyTextInput name='roomNo' placeholder='RoomNo' />
                        <MySelectInput name='roomType' placeholder='Room Type' options={types} />
                        <MySelectInput name='floor' placeholder='Floor' options={floors} />
                        
                      <Header sub content='Department' /> 
                        <select className="form-control" data-val="true" name="department" >  
                            <option value="">-- Select Department --</option>  
                            {departments.map(department =>  
                                <option key={department.id} value={department.name}>{department.name}</option>  
                            )}  
                        </select>  
                    
                         <Header sub content='Patient' />
                        <select className="form-control" data-val="true" name="patient">  
                            <option value="">-- Select Patient --</option>  
                            {patients.map(patient =>  
                                <option key={patient.id} value={patient.firstName +' '+patient.lastName}>{patient.firstName+' '+patient.lastName}</option>  
                            )}  
                        </select>  
                       
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