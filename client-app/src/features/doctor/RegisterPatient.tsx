import React from "react"
import { Button, Checkbox, Container, Dropdown, Form, Icon, Input, Menu, Progress, Segment, Table } from "semantic-ui-react"
import {useStore}  from "../../app/stores/store";

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

export default function RegisterPatient() {
    return (

    <Container>

    <Menu pointing style={{ borderRadius: "10px", padding: "10px" }}>
        <Menu.Item name="dashboard" />
        <Menu.Item name="appointments" />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item style={{ color: "black", backgroundColor: "#3BBCA6" }} name="Set new appointment" />
        </Menu.Menu>
      </Menu>

      <Segment>
        All Appointments
        <Progress percent={40} size="tiny" />
        <Checkbox label="See all" />
        <Dropdown
          position="right"
          style={{ left: "70%" }}
          options={[]}
          search
          selection
          placeholder="Sort by..."
        />
      </Segment>

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