import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid, Header, Item, Label, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
    id: string
}
export default observer(function MedicalInfo({ id }: Props) { //

    const { 
    diagnosisStore: { loadDiagnosisByPatient, selectedDiagnosis }, 
    analysisStore: { selectedAnalyse, loadAnalysisByPatient}
    } = useStore();

    useEffect(() => {
        if (id) loadDiagnosisByPatient(id) && loadAnalysisByPatient(id);
    }, [id, loadDiagnosisByPatient , loadAnalysisByPatient]);

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
                    <Table basic="very" celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Analysis</Table.HeaderCell>
              <Table.HeaderCell>Analysis Results</Table.HeaderCell>
              <Table.HeaderCell>Reference Range</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {/* <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Eritrocite
                    <Header.Subheader>
                      Sedimentimi i eritrociteve
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{selectedAnalyse?.eritrocite}</Table.Cell>
              <Table.Cell>M: deri 10; F: deri 15</Table.Cell>
            </Table.Row> */}
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Hemoglobina
                    <Header.Subheader>Hemoglobina</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{selectedAnalyse?.hemoglobina}</Table.Cell>
              <Table.Cell>M: 140-280; F: 120-160</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Leukocite
                    <Header.Subheader>Numri i leukociteve</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{selectedAnalyse?.leukocite}</Table.Cell>
              <Table.Cell>4.8 - 7.0</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Hematokriti
                    <Header.Subheader>Hematokriti</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{selectedAnalyse?.hemakrotiti}</Table.Cell>
              <Table.Cell>35 - 45</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Trombocite
                    <Header.Subheader>Numri i trombociteve</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{selectedAnalyse?.tromobocite}</Table.Cell>
              <Table.Cell>140 - 310</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Retikulocite
                    <Header.Subheader>
                      Numri i retikulociteve
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{selectedAnalyse?.retikulocite}</Table.Cell>
              <Table.Cell>5 - 15</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Neutrofile
                    <Header.Subheader>
                      Perqindja e neutrofileve
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{selectedAnalyse?.neutrofile}</Table.Cell>
              <Table.Cell>54 - 62</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Limfocite
                    <Header.Subheader>
                      Perqindja e limfociteve
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{selectedAnalyse?.limfocite}</Table.Cell>
              <Table.Cell>25 - 33</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Monocite
                    <Header.Subheader>
                      Perqindja e monociteve
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{selectedAnalyse?.monocite}</Table.Cell>
              <Table.Cell>3 - 7</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Urea
                    <Header.Subheader>mmol/L</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{selectedAnalyse?.urea}</Table.Cell>
              <Table.Cell>2.5 - 8.3</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Glukoza
                    <Header.Subheader>mmol/L</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{selectedAnalyse?.glukoza}</Table.Cell>
              <Table.Cell>3.8 - 6.1</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>
                    Kolesteroli
                    <Header.Subheader>mmol/L</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{selectedAnalyse?.kolesteroli}</Table.Cell>
              <Table.Cell> {"<"} 6.5</Table.Cell>
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
})