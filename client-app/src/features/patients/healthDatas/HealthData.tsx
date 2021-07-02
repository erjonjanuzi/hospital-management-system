import { observer } from 'mobx-react-lite';
import { Button, Header, Segment, Table,List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AddHealthData from './AddHealthData';
import React, { useEffect } from 'react';
import ViewHealthData from './ViewHealthData';
import Breadcrumbs from '../my-profile/Breadcrumbs';


export default observer(function HealthData(){
    const {healthDataStore,modalStore}=useStore();
    const {healthDatas,healthDataRegistry,loadHealthDatas,deleteHealthData} = healthDataStore

    
   useEffect(() => {
       if(healthDataRegistry.size<=0)loadHealthDatas();
   } ,[healthDataRegistry.size,loadHealthDatas])
    
        return (
         
            <>
              <Breadcrumbs> </Breadcrumbs>
              <div>
              <Button icon='plus square outline'  color='green'
               content='Create Personal Health Record' onClick={() => modalStore.openModal(<AddHealthData/>)}/>

            
              <Segment clearing>
              <Header as="h4" content="My Health Record" />
               <List >  {healthDatas.map(healthData => (
                        <List.Item key={healthData.id}>
                            <Segment clearing>
                           <List.Item>
                           <List.Header as='h3' >{healthData.medication}</List.Header>
                            Treated for any medical condition at the present or treated within the past year...
                           </List.Item>
                           </Segment>
                         <Segment clearing>
                            <List.Item>
                            <List.Header as='h3'>{healthData.checkup}</List.Header>
                            Last medical checkup...
                            </List.Item>
                            </Segment>
                            <Segment clearing>
                            <List.Item>
                            <List.Header as='h3'>{healthData.drugs}</List.Header>
                            Taking any medications, non-prescription drugs or herbal supplements of any kind...
                            </List.Item>
                            </Segment>
                            <Segment clearing>
                            <List.Item>
                            <List.Header as='h3'>{healthData.allergies}</List.Header>
                            Allergies...
                            </List.Item>
                            </Segment>
                            <Segment clearing>
                            <List.Item>
                            <List.Header as='h3'>{healthData.injections}</List.Header>
                            Reaction to any medicines or injections...
                            </List.Item>
                            </Segment>
                            <Segment clearing>
                            <List.Item>
                            <List.Header as='h3'>{healthData.asthma}</List.Header>
                            Asthma...
                            </List.Item>
                            </Segment>
                            <Segment clearing>
                            <List.Item>
                            <List.Header as='h3'>{healthData.disease}</List.Header>
                            Hepatitis, jaundice or liver disease...
                            </List.Item>
                            </Segment>
                            <Segment clearing>
                            <List.Item>
                            <List.Header as='h3'>{healthData.immune}</List.Header>
                            Therapies that could affect my immune system...
                            </List.Item>
                            </Segment>
                            <Segment clearing>
                            <List.Item>
                            <List.Header as='h3'>{healthData.smoke}</List.Header>
                            Smoke or chew tobacco products...
                            </List.Item>
                            </Segment>
                            <Segment clearing>
                            <List.Item>
                            <List.Header as='h3'>{healthData.relatives}</List.Header>
                            Diseases or medical problems that run in my family...
                            </List.Item>
                            </Segment>
                            <Segment clearing>
                            <List.Item>
                           
                            <Button  icon='edit'  color='blue' 
                                    onClick={() => modalStore.openModal(<ViewHealthData id={healthData.id} />)}
                                    />
                                    <Button icon='delete' color='red' 
                                     onClick={()=>deleteHealthData(healthData.id)}
                                    /> 
                           
                           
                            </List.Item>
                            </Segment>
                        </List.Item>
                    ))}  
                  </List>
              </Segment>
              </div>
            
            </>
          );
        });
        