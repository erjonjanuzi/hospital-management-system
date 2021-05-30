import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { Button, Card, Image ,Modal,Header,Divider} from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import ViewDepartment from '../departments/ViewDepartment';



export default function DepartmentsPage(){
  const { accountManagementStore, modalStore } = useStore();

const [open, setOpen] = React.useState(false); 
    return (
      
      
        <Segment style={{minHeight: '100vh'}}>
            <Item>
       
 
  <Card.Group>
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://cdn1.iconfinder.com/data/icons/medical-specialties-1-3/380/Neurology-512.png'
        />
        <Card.Header>Neurology</Card.Header>
        <Card.Meta>Capacity 18/100</Card.Meta>
        <Card.Description>
        Neurologists diagnose, treat and manage disorders that affect
         the central nervous system.
         
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <div className='ui two buttons'>
      <Button   
                content="View"
                basic
                color="green"
                onClick={() => modalStore.openModal(<ViewDepartment />)}
              />
              </div>
      </Card.Content>
    </Card>

    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://image.flaticon.com/icons/png/512/1453/1453673.png'
        />
        <Card.Header>Urology</Card.Header>
        <Card.Meta>Capacity 10/34</Card.Meta>
        <Card.Description>
        A urologist might treat bladder problems, urinary tract infections,
         bladder and kidney cancer, kidney blockage, and kidney stones.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <div className='ui two buttons'>
      <Button   
                content="View"
                basic
                color="green"
                onClick={() => modalStore.openModal(<ViewDepartment />)}
              />
              </div>
      </Card.Content>
    </Card>

    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://image.flaticon.com/icons/png/512/387/387629.png'
        />
        <Card.Header>Surgery</Card.Header>
        <Card.Meta>Capacity 21/88</Card.Meta>
        <Card.Description>
        The Department of General Surgery provides surgical interventions 
        that focus on the 
        tract, liver, colon, and other major parts of the human body.         </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <div className='ui two buttons'>
      <Button   
                content="View"
                basic
                color="green"
                onClick={() => modalStore.openModal(<ViewDepartment />)}
              />
              </div>
      </Card.Content>
    </Card>

    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://cdn1.iconfinder.com/data/icons/medical-specialties-1-3/380/Cardiology-512.png'
        />
        <Card.Header>Cardiology</Card.Header>
        <Card.Meta>Capacity 34/78</Card.Meta>
        <Card.Description>
        The Cardiology Department diagnoses and treats heart diseases. These include ischaemic 
        heart diseases such as myocardial infarcts and angina.        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <div className='ui two buttons'>
      <Button   
                content="View"
                basic
                color="green"
                onClick={() => modalStore.openModal(<ViewDepartment />)}
              />
              </div>
      </Card.Content>
    </Card>

    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://cdn.iconscout.com/icon/premium/png-256-thumb/dermatology-5-719524.png'
        />
        <Card.Header>Dermatology</Card.Header>
        <Card.Meta>Capacity 22/78</Card.Meta>
        <Card.Description>
        Dermatologists are doctors who diagnose, investigate, treat and manage the
         conditions of children and adults with skin disease.        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <div className='ui two buttons'>
      <Button   
                content="View"
                basic
                color="green"
                onClick={() => modalStore.openModal(<ViewDepartment />)}
              />
              </div>
      </Card.Content>
    </Card>

    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://cdn3.iconfinder.com/data/icons/dental-30/65/31-512.png'
        />
        <Card.Header>Stomatology</Card.Header>
        <Card.Meta>Capacity 12/44</Card.Meta>
        <Card.Description>
        The team renders routine and advanced diagnostic
         procedures and treatments such as oral and maxillofacial surgery.
               </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <div className='ui two buttons'>
      <Button   
                content="View"
                basic
                color="green"
                onClick={() => modalStore.openModal(<ViewDepartment />)}
              />
              </div>
      </Card.Content>
    </Card>

    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://cdn1.iconfinder.com/data/icons/medical-health-care-2-2/380/Family_Medicine-512.png'
        />
        <Card.Header>Pediatrics</Card.Header>
        <Card.Meta>Capacity 34/100</Card.Meta>
        <Card.Description>
        Paediatricians are medical specialists who diagnose, treat and provide
         medical care for babies, children and teenagers. 
         They deal with illnesses,physical, 
         mental and behavioural development.      </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <div className='ui two buttons'>
      <Button   
                content="View"
                basic
                color="green"
                onClick={() => modalStore.openModal(<ViewDepartment />)}
              />
              </div>
      </Card.Content>
      
    </Card>



    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://png.pngtree.com/png-vector/20190827/ourlarge/pngtree-cancer-oncology-ribbon-medical-abstract-flat-color-icon-templ-png-image_1700507.jpg'
        />
        <Card.Header>Oncology</Card.Header>
        <Card.Meta>Capacity 22/67</Card.Meta>
        <Card.Description>
        oncology: focuses on treatment of cancer with chemotherapy,
         targeted therapy, immunotherapy, and hormonal therapy.        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <div className='ui two buttons'>
      <Button   
                content="View"
                basic
                color="green"
                onClick={() => modalStore.openModal(<ViewDepartment />)}
              />
              </div>
        
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://cdn0.iconfinder.com/data/icons/medical-volume-2-4/256/93-512.png'
        />
        <Card.Header>Radiology</Card.Header>
        <Card.Meta>Capacity 23/55</Card.Meta>
        <Card.Description>
        Radiology is a medical specialty that uses imaging to diagnose
         and treat diseases seen within the body.        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <div className='ui two buttons'>
      <Button   
                content="View"
                basic
                color="green"
                onClick={() => modalStore.openModal(<ViewDepartment />)}
              />
              </div>
      </Card.Content>
    </Card>
  </Card.Group>
             


            </Item>
        </Segment>
    )
}