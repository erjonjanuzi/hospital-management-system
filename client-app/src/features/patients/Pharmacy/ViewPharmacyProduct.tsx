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

export default observer(function ViewPharmacyProduct({id}:Props){

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
                {({ handleSubmit}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header sub content='Pharmacy Product Details' color='green' inverted/>
                        <Form.Group widths={2}> 
                        <Form.Field><h5>Product Name:</h5>
                        <MyTextInput  name='productName' placeholder='Product Name'/>
                        </Form.Field>
                        <Form.Field><h5>Product Code:</h5>
                        <MyTextInput  name='productCode' placeholder='Product Code'/>
                        </Form.Field>
                        </Form.Group>
                        <Form.Group widths={2}>
                        <Form.Field><h5>Category:</h5>
                        <MyTextInput  name='category' placeholder='Category'/>
                        </Form.Field>
                        <Form.Field><h5>Country:</h5>
                        <MyTextInput  name='country' placeholder='Country'/>
                        </Form.Field>
                        </Form.Group>
                        <Form.Group widths={3}> 
                        <Form.Field><h5>Manufacturer:</h5>
                        <MyTextInput  name='manufacturer' placeholder='Manufacturer'/>
                        </Form.Field>
                        <Form.Field><h5>Prescription:</h5>
                        <MyTextInput  name='prescription' placeholder='Prescription'/>
                        </Form.Field>
                        <Form.Field><h5>Mg:</h5>
                        <MyTextInput  name='mg' placeholder='Mg'/>
                        </Form.Field>
                        </Form.Group>
                        <Form.Group widths={2}>
                        <Form.Field><h5>Price:</h5>
                        <MyTextInput  name='price' placeholder='Price'/>
                        </Form.Field>
                        <Form.Field><h5>Quantity:</h5>
                        <MyTextInput  name='quantity' placeholder='Quantity'/>
                        </Form.Field>
                        </Form.Group>
                        <Divider />
                    </Form>
                )}
            </Formik>
        </>
    )
})