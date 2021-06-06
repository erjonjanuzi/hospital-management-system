import { observer } from 'mobx-react-lite'
import React from 'react'
import { useLocation } from 'react-router';
import { Input, Menu } from 'semantic-ui-react'


export default observer(function Breadcrumbs() {
  const path = useLocation();
  return (
    <Menu pointing style={{ borderRadius: "10px", padding: "10px" }}>
      <Menu.Item name={path.pathname.split("/")[1]} />
      <Menu.Item name={path.pathname.split("/")[2]} />
      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
})
