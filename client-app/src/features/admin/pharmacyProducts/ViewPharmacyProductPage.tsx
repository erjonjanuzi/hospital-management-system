import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { Button, Divider, Form, Header } from "semantic-ui-react";
import { Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
interface Props{
    id : string;
}

export default observer(function ViewPharmacyProductPage({id}:Props){

    const{pharmacyStore :{loadPharmacy,selectedPharmacy,updatePharmacy},modalStore} = useStore();

    useEffect(() => {
    if(id)loadPharmacy(id);
    }, [id,loadPharmacy]);

    const validationSchema = Yup.object({
        productName:Yup.string().required('Product Name is required'),
        productCode:Yup.string().required('Product Code is required'),
        price:Yup.string().required('Price is required'),
        quantity:Yup.string().required('Quantity is required'),
    })
    return(
        <>
            <Header as='h1' content='Pharmacy Product Details' />
            <Divider />
            <Formik
                initialValues={selectedPharmacy!} 
                onSubmit={(values) => updatePharmacy(values).catch(error => console.log(error))}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='Pharmacy Product Details' color='green' inverted/>
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