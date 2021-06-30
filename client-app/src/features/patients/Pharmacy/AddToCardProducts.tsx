import { Formik } from 'formik';
import React, { useEffect } from 'react'
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';

interface Props{
  id : string;
}

function AddToCardProducts({id}:Props){

  const{pharmacyStore :{loadPharmacy,selectedPharmacy,updatePharmacy}} = useStore();

  useEffect(() => {
    if(id)loadPharmacy(id);
    }, [id,loadPharmacy]);

    const validationSchema = Yup.object({
      productName:Yup.string().required('Product Name is required'),
      productCode:Yup.string().required('Product Code is required'),
      price:Yup.string().required('Price is required'),
      quantity:Yup.string().required('Quantity is required'),
  })

  return ( 
    <>
        <Formik
            initialValues={selectedPharmacy!} 
            onSubmit={(values) => updatePharmacy(values).catch(error => console.log(error))}
            enableReinitialize
            validationSchema={validationSchema}
        >
        </Formik>
  
    </>
  )
}

export default AddToCardProducts