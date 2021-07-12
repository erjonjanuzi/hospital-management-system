import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Container, Divider, Header, Table } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import EditAnalysis from "./EditAnalysis";

interface Props {
  id: string;
}

export default observer(function ViewAnalysis({ id }: Props) {

  const { accountManagementStore: { loadAccount },
    analysisStore: { deleteAnalyse, loadAnalysisByPatient, selectedAnalyse }, modalStore
  } = useStore();


  useEffect(() => {
    if (id) loadAccount(id);
  }, [id, loadAccount]);


  useEffect(() => {
    if (id) loadAnalysisByPatient(id);
  }, [id, loadAnalysisByPatient])

  const analyse = selectedAnalyse;
  console.log(id);

  return (
    <>
      <div>
        <Container textAlign="justified">
          <Table basic="very" celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Analysis</Table.HeaderCell>
                <Table.HeaderCell>Analysis Results</Table.HeaderCell>
                <Table.HeaderCell>Reference Range</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
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
                <Table.Cell>{analyse?.eritrocite}</Table.Cell>
                <Table.Cell>M: deri 10; F: deri 15</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      Hemoglobina
                      <Header.Subheader>Hemoglobina</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{analyse?.hemoglobina}</Table.Cell>
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
                <Table.Cell>{analyse?.leukocite}</Table.Cell>
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
                <Table.Cell>{analyse?.hemakrotiti}</Table.Cell>
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
                <Table.Cell>{analyse?.tromobocite}</Table.Cell>
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
                <Table.Cell>{analyse?.retikulocite}</Table.Cell>
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
                <Table.Cell>{analyse?.neutrofile}</Table.Cell>
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
                <Table.Cell>{analyse?.limfocite}</Table.Cell>
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
                <Table.Cell>{analyse?.monocite}</Table.Cell>
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
                <Table.Cell>{analyse?.urea}</Table.Cell>
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
                <Table.Cell>{analyse?.glukoza}</Table.Cell>
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
                <Table.Cell>{analyse?.kolesteroli}</Table.Cell>
                <Table.Cell> {"<"} 6.5</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Divider hidden />
          <div>
            <Button
              content="Edit"
              icon="edit"
              basic
              color="youtube"
              onClick={() => modalStore.openModal(<EditAnalysis id={analyse?.id!} />)}
            />
            <Button
              color="red"
              content="Delete"
              icon="delete"
              labelPosition="right"
              onClick={() => deleteAnalyse(id)}

            />
          </div>
        </Container>
      </div>
    </>
  );
});