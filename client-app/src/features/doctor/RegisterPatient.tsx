import React from "react"
import { Button, Container, Form, Segment } from "semantic-ui-react"
import Breadcrumbs from "../patients/my-profile/Breadcrumbs"


const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

export default function RegisterPatient() {
  
    return (

    <Container>

    <Breadcrumbs></Breadcrumbs>

       <Form>
         <Segment>
         <Form.Group unstackable widths={3} >
          <Form.Input label='First Name' placeholder='First Name' />
          <Form.Input label='Middle Name' placeholder='Middle Name' />
          <Form.Input label='Last Name' placeholder='Last Name' />
         </Form.Group>

         <Form.Group widths={2}>
         <Form.Select
            fluid
            label='Gender'
            options={options}
            placeholder='Gender'
          />
          <Form.Input label='Phone' placeholder='Phone' /> 
          </Form.Group>

         <Form.Group widths={2}>
         <Form.Input label='Email' placeholder='Address' />
         <Form.Input label='Address' placeholder='Address' />
         </Form.Group>

         <Form.Group widths={2}>
         <Form.TextArea label='About' placeholder='Tell us more about you...' />
        <Form.Input label='Password' placeholder='Paswword' type='Password' />
         </Form.Group>

         <Form.Group>
         <Form.Checkbox label='Are you allergic to medicaments?'/>
         </Form.Group>

         <Form.Group>
         <Button basic color='black'>
          Register
        </Button>
         </Form.Group>
         </Segment>
       </Form>



      </Container>
    )
}