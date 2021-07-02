import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from 'react';
import { Button, Container, Divider, Form, Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

interface Props{
    id : string
}

export default observer(function ViewReport({id} : Props){

    const { accountManagementStore: { loadAccount, selectedAccount },
        medicalReportStore: { updateReport, deleteReport, loadReportsByPatient, selectedReport }, modalStore
    } = useStore();

    useEffect(() => {
        if (id) loadAccount(id);
    }, [id, loadAccount]);

    useEffect(() => {
        if (id) loadReportsByPatient(id);
    }, [id, loadReportsByPatient])

    const Reports = selectedReport;
    console.log(id);

    return(
        <>
        <div>
                <Container textAlign='center'>{selectedAccount?.firstName}'s Report</Container>
                <Container textAlign='justified'>
                    <Divider />
                    <Header sub>First Name:</Header>
                    <span>{Reports?.firstName}</span> 
                    <Header sub>Last Name:</Header>
                    <span>{Reports?.lastName}</span>
                    <Header sub>Age:</Header>
                    <span>{Reports?.age}</span>
                    <Header sub>Date:</Header>
                    <span>{Reports?.date.split('T')[0]}</span>
                    <Header sub>Patient Report:</Header>
                    <span>{Reports?.report}</span>

                    <Divider hidden />
                </Container>
            </div>
        </>
    )
})