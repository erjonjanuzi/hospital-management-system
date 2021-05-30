import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  Image,
  Menu
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function NavBar() {
  const {
    userStore: { user,logout },
  } = useStore();
  console.log("displayname: "+user?.displayName)
  
  const menuItemStyle = {
    color: "white", 
    backgroundColor: "#3BBCA6",
    borderRadius: "30px", 
    textAlign: "center", 
    width: "15vw"
  }

  return ( 
    <Menu
      vertical={true}
      
      fixed="left"
      style={{ marginRight: "50px", minWidth: "20vw"}}
    >
      <>
        <Menu.Item 
          style={{ padding: "0px", height: '15%' }}>
          <div className="sidebar-logo-header">
            <img src="/assets/logo.png" alt="logo" />
            <h2 style={{ margin: "0", padding: 0 }}>MEDCARE Hospital</h2>
          </div>
        </Menu.Item>
      </>

      <Menu.Item
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src="/assets/user.png" size="tiny" circular />
        <h3 style={{ margin: "0 10px", padding: 0 }}>{user?.username}</h3>
      </Menu.Item>
      

      {user?.role === 'admin' &&(
        <>
        <Divider hidden />
        <Menu.Item as={Link} to="/admin/dashboard"
        style={menuItemStyle}>
        Dashboard
        </Menu.Item>
        <Divider hidden />

        <Menu.Item as={Link} to="/admin/accounts"
        style={menuItemStyle}>
          Account Management
        </Menu.Item>
        <Divider hidden />

        <Menu.Item as={Link} to="/admin/appointments"
        style={menuItemStyle}>
          Appointments
        </Menu.Item>
        <Divider hidden />

        <Menu.Item as={Link} to="/admin/departments"
        style={menuItemStyle}>
          departments
        </Menu.Item>
        <Divider hidden />
        </>
      )}
      
      {user?.role=== 'doctor' &&(
        <>
        <Divider hidden />
        <Menu.Item as={Link} 
          style={menuItemStyle}
          to="/doctor/dashboard"
          >
          Dashboard
          
        </Menu.Item>
        <Divider hidden />

        <Menu.Item as={Link} to="/doctor/appointmets-patient"
        style={menuItemStyle}>
         AppointmentsP
        </Menu.Item>
        <Divider hidden />

        <Menu.Item as={Link} to="/doctor/patient-profile"
        style={menuItemStyle}>
         Patient Profile
        </Menu.Item>
        <Divider hidden />

        <Menu.Item as={Link} to="/doctor/register-patient"
        style={menuItemStyle}>
         Register Patient
        </Menu.Item>
        <Divider hidden />

        <Menu.Item as={Link} to="/doctor/diagnosis"
        style={menuItemStyle}>
         Patient's Diagnosis
        </Menu.Item>
        <Divider hidden />
        </>
      )}
     
     <Divider hidden />
      <Menu.Item
        as={Link}
        style={{textAlign: "center"}}
        content="Logout"
        onClick={logout}
        text="Logout"
        icon="power"
      />
    </Menu>
  );
});
