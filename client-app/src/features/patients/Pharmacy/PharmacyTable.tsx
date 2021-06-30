import { observer } from "mobx-react-lite";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import ViewPharmacyProduct from "./ViewPharmacyProduct";
import * as Yup from 'yup';
import { Formik } from "formik";


interface Props{
    id : string;
  }

export default observer(function PharmacyTable({id}:Props){
    const {pharmacyStore,modalStore} = useStore();
    const {pharmacies,pharmacyRegistry,loadPharmacies} = pharmacyStore
    const{pharmacyStore :{loadPharmacy,selectedPharmacy,updatePharmacy}} = useStore();

    useEffect(() => {
        if (pharmacyRegistry.size <= 1) loadPharmacies();
    }, [pharmacyRegistry.size, loadPharmacies])

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
        <Segment>
            <Header content='Buy Pharmacy Products' icon='cart'/>
            <Header content='All Products' />
            <Button color='green' size='large'><Icon name='cart'></Icon>My orders</Button>
            <Table textAlign="center" color='green'>

                <Table.Header >

                    <Table.Row>
                        <Table.HeaderCell>Product Name <Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>Category <Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>Country <Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>Manufacturer <Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>With prescription / Without prescription<Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>Mg <Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>Price <Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>Quantity <Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>Buy/View <Icon name='angle down'/></Table.HeaderCell>
                    </Table.Row>

                </Table.Header>
                <Formik
                    initialValues={selectedPharmacy!} 
                    onSubmit={(values) => updatePharmacy(values).catch(error => console.log(error))}
                    enableReinitialize
                    validationSchema={validationSchema}
                > 
                <Table.Body> 
                    {pharmacies.map(pharmacy=>(
                                <Table.Row key={pharmacy.id}>
                                     <Table.Cell>{pharmacy.productName}</Table.Cell> 
                                    <Table.Cell>{pharmacy.category}</Table.Cell> 
                                    <Table.Cell>{pharmacy.country}</Table.Cell>
                                    <Table.Cell>{pharmacy.manufacturer}</Table.Cell> 
                                    <Table.Cell>{pharmacy.prescription}</Table.Cell>
                                    <Table.Cell>{pharmacy.mg}</Table.Cell> 
                                    <Table.Cell>{pharmacy.price}</Table.Cell>
                                    <Table.Cell>{pharmacy.quantity}</Table.Cell>
                                    <Table.Cell>
                                    <Button content='Add to cart' icon='cart' color='green'
                                    />
                                    <Button content='View' icon='eye' basic color='youtube'
                                     onClick={() => modalStore.openModal(<ViewPharmacyProduct id={pharmacy.id}/>)}
                                    /> 
                                    </Table.Cell>
                                </Table.Row>
                    ))}  
                </Table.Body>
                </Formik>
            </Table>
        </Segment> 
        </>
    )
})