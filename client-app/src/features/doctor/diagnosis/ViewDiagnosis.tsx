import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Container, Divider, Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
    id: string
}

export default observer(function ViewDiagnosis({ id }: Props) {

    const { accountManagementStore: {loadAccount, selectedAccount }, 
            diagnosisStore: { deleteDiagnosis,loadDiagnosisByPatient , selectedDiagnosis}
            } = useStore();
    

    useEffect(() => {
        if (id) loadAccount(id);
    }, [id, loadAccount]);

    useEffect(()=> {
        if (id) loadDiagnosisByPatient(id);
    }, [id, loadDiagnosisByPatient])


    const Diagnosis = selectedDiagnosis;
    console.log(id);
    return (
        <>
            <div>
                <Container textAlign='center'>{selectedAccount?.firstName}'s Diagnosis</Container>
                <Container textAlign='justified'>
                    <b>{Diagnosis?.title}</b>
                    <Divider />
                    <Header sub>Details</Header>
                    <span>{Diagnosis?.details}</span>
                    <Header sub>Type</Header>
                    <span>{Diagnosis?.type}</span>
                    <Header sub>Stage</Header>
                    <span>{Diagnosis?.stage}</span>
                    <Header sub>Date</Header>
                    <span>{Diagnosis?.date.split('T')[0]}</span>

                    <Divider hidden/>
                    <div>
                        <Button color='green' content=' Edit ' icon='edit' labelPosition='left' />
                        <Button 
                        onClick={() => deleteDiagnosis(id)}
                        
                        color='red' content='Delete' icon='delete' labelPosition='right' />
                    </div>

                </Container>
            </div>
        </>
    )
})