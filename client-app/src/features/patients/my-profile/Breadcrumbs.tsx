import { observer } from 'mobx-react-lite'
import React from 'react'
import { Input, Menu } from 'semantic-ui-react'


export default observer(function Breadcrumbs(){
    
    return(
        <Menu pointing style={{ borderRadius: "10px", padding: "10px" }}>
        <Menu.Item name="dashboard" />
        <Menu.Item name="Patient Profile" />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item style={{ color: "black", backgroundColor: "#3BBCA6" }} name="Set new appointment" />
        </Menu.Menu>
      </Menu>
    )
})
