import { useEffect } from 'react';
import { Grid, Header, Label, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
    id: string
}
export default function MedicalInfo({ id }: Props) { //

    const {
        diagnosisStore: { loadDiagnosisByPatient, selectedDiagnosis }, analysisStore: { selectedAnalyse, loadAnalysisByPatient }
    } = useStore();

    useEffect(() => {
        if (id) loadDiagnosisByPatient(id);
    }, [id, loadDiagnosisByPatient])

    useEffect(() => {
        if (id) loadAnalysisByPatient(id);
    }, [id, loadAnalysisByPatient])

    console.log(selectedAnalyse)

    //dummydata => to be removed
    const Patient = {
        analysis: {
            eritrocite: "4",
            hemoglobina: "11",
            leukocite: "6",
            hemakrotiti: "40",
            tromobocite: "350",
            retikulocite: "30",
            neutrofile: "20.5",
            limfocite: "10.2",
            monocite: "10.5",
            urea: "30",
            glukoza: "1.5",
            kolesteroli: "34",
        },
        diagnosis: {
            title: "Hepatitis",
            type: "B",
            stage: "1",
            details: "Hepatitis B is a serious liver infection caused by the hepatitis B virus (HBV). For some people, hepatitis B infection becomes chronic, meaning it lasts more than six months. Having chronic hepatitis B increases your risk of developing liver failure, liver cancer or cirrhosis — a condition that permanently scars of the liver.",
            date: "20/06/2021",
        },
        details: {
            height: "188 cm",
            weight: "102 kg",
            bloodType: "0(+)poz"
        }


    }

    return (
        <>
            <Segment>
                <Grid>
                    <Grid.Column width='8'>
                        <Table basic='very' collapsing >
                            <Table.Body>
                                <Header style={{ marginTop: '15px' }} as='h1' content={"Analysis"} />
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='eritrocite' />
                                    </Table.Cell>
                                    <Table.Cell>{selectedAnalyse?.eritrocite}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='hemakrotiti' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.analysis.hemakrotiti}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='hemoglobina' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.analysis.hemoglobina}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='kolesteroli' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.analysis.kolesteroli}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='leukocite' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.analysis.leukocite}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='limfocite' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.analysis.limfocite}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='monocite' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.analysis.monocite}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='neutrofile' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.analysis.neutrofile}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='retikulocite' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.analysis.retikulocite}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='tromobocite' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.analysis.tromobocite}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='urea' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.analysis.urea}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>

                    <Grid.Column width='8'>

                        <Table basic='very' collapsing>
                            <Table.Body>
                                <Header style={{ marginTop: '15px' }} as='h1' content={"Medical Details"} />
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Blood Type' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.details.bloodType}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Height' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.details.height}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Weight' />
                                    </Table.Cell>
                                    <Table.Cell>{Patient?.details.weight}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                        <Table basic='very' collapsing >
                            <Table.Body>
                                <Header style={{ marginTop: '15px' }} as='h1' content={"Diagnosis"} />
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Diagnosis' />
                                    </Table.Cell>
                                    <Table.Cell>{selectedDiagnosis?.title}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Type' />
                                    </Table.Cell>
                                    <Table.Cell>{selectedDiagnosis?.type}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Stage' />
                                    </Table.Cell>
                                    <Table.Cell>{selectedDiagnosis?.stage}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Details' />
                                    </Table.Cell>
                                    <Table.Cell>{selectedDiagnosis?.details}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label basic content='Date Diagnosed' />
                                    </Table.Cell>
                                    <Table.Cell>{(selectedDiagnosis?.date)?.split('T')[0]}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </Segment>
        </>
    )
}