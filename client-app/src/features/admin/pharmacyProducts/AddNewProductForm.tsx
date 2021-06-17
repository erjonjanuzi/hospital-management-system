import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { Header,Divider, Form , Message, Button} from "semantic-ui-react";
import { ErrorMessage, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";



export default observer(function AddNewPharmacyProductForm(){
    const{pharmacyStore,modalStore} = useStore();

    const selectedPharmacy ={
        productName : '',
        productCode : '',
        price : '',
        quantity : '',
        error : null,
    }

    const validationSchema = Yup.object({
        productName:Yup.string().required('Product Name is required'),
        productCode:Yup.string().required('Product Code is required'),
        price:Yup.string().required('Price is required'),
        quantity:Yup.string().required('Quantity is required'),
    })

    return(
     <>
                 <Header as='h1' content='Add Pharmacy Product' color='green' inverted />
            <Divider />
            <Formik
                initialValues={selectedPharmacy} 
                onSubmit={(values, { setErrors }) => pharmacyStore.createPharmacy(values).catch(error =>
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
                        <Header sub content='Add Pharmacy Product' />
                        <Form.Group widths={2}> 
                        <MyTextInput name='productName' placeholder='Product Name' />
                        <MyTextInput name='productCode' placeholder='Product Code' />
                        </Form.Group>
                        <Form.Group widths={2}>
                        <MyTextInput name='price' placeholder='Price' />
                        <MyTextInput name='quantity' placeholder='Quantity' />
                        </Form.Group>
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