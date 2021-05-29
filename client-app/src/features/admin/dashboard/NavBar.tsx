import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
  Image,
  Menu
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function NavBar() {
  const {
    userStore: { user,logout },
  } = useStore();
  console.log("displayname: "+user?.displayName)
  
  return ( 
    <Menu
      vertical={true}
      fixed="left"
      style={{ marginRight: "50px", minWidth: "20vw" }}
    >
      <Menu.Item style={{ padding: "0px" }}>
        <div className="sidebar-logo-header">
          <img src="/assets/logo.png" alt="logo" />
          <h2 style={{ margin: "0", padding: 0 }}>MEDCARE Hospital</h2>
        </div>
      </Menu.Item>
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
      

      {user?.role=== 'Admin' &&(
        <>
        <Menu.Item as={Link} to="/admin/dashboard">
        Dashboard
        </Menu.Item>

        <Menu.Item as={Link} to="/admin/accounts">
          Account Management
        </Menu.Item>

        <Menu.Item as={Link} to="/admin/appointments">
          Appointments
        </Menu.Item>

        <Menu.Item as={Link} to="/admin/departments">
          departments
        </Menu.Item>
        </>
      )}
      
      {user?.role=== 'Doctor' &&(
        <>
        <Menu.Item as={Link} 
          to="/doctor/dashboard">
          Dashboard
        </Menu.Item>

        <Menu.Item as={Link} to="/doctor/appointmets-patient">
         AppointmentsP
        </Menu.Item>

        <Menu.Item as={Link} to="/doctor/patient-profile">
         Patient Profile
        </Menu.Item>

        <Menu.Item as={Link} to="/doctor/register-patient">
         Register Patient
        </Menu.Item>

        <Menu.Item as={Link} to="/doctor/diagnosis">
         Patient's Diagnosis
        </Menu.Item>
        </>
      )}
     
      <Menu.Item
        as={Link}
        content="Logout"
        onClick={logout}
        text="Logout"
        icon="power"
      />
    </Menu>
  );
});
