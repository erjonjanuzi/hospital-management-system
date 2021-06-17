import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import AddNewProductForm from "./AddNewProductForm";
import ViewPharmacyProductPage from "./ViewPharmacyProductPage";


export default observer(function PharmacyProductTable(){

    const {pharmacyStore,modalStore} = useStore();
    const {pharmacies,pharmacyRegistry,loadPharmacies,deletePharmacy} = pharmacyStore

    useEffect(() => {
        if (pharmacyRegistry.size <= 1) loadPharmacies();
    }, [pharmacyRegistry.size, loadPharmacies])


    return(
        <Segment>
            <Button inverted color='green' content='Add Pharmacy Products' onClick={() => modalStore.openModal(<AddNewProductForm/>)}/>
            <Header content='Pharmacy Products' />
            <Header sub content='All Products' />
            <Table textAlign="center" color='green'>

                <Table.Header >

                    <Table.Row>
                        <Table.HeaderCell>Product Name <Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>Product Code <Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>Price <Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>Modification Date <Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>Quantity <Icon name='angle down'/></Table.HeaderCell>
                        <Table.HeaderCell>Edit/Delete <Icon name='angle down'/></Table.HeaderCell>
                    </Table.Row>

                </Table.Header> 
                
                <Table.Body>
                    {pharmacies.map(pharmacy=>(
                                <Table.Row key={pharmacy.id}>
                                    <Table.Cell>{pharmacy.productName}</Table.Cell> 
                                    <Table.Cell>{pharmacy.productCode}</Table.Cell>
                                    <Table.Cell>{pharmacy.price}</Table.Cell>
                                    <Table.Cell>{pharmacy.modificationDate.split('T')[0]}</Table.Cell>
                                    <Table.Cell>{pharmacy.quantity}</Table.Cell>
                                    <Table.Cell>
                                    <Button content='Edit' icon='edit' basic color='youtube'
                                    onClick={() => modalStore.openModal(<ViewPharmacyProductPage id={pharmacy.id}/>)}
                                    />
                                    <Button inverted icon='delete' color='red'
                                     onClick={()=>deletePharmacy(pharmacy.id)}
                                    /> 
                                    </Table.Cell>
                    </Table.Row>
                    ))} 
                </Table.Body>
            </Table>
        </Segment>
    )
})
