import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Image, Menu} from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const { userStore: { user, logout } } = useStore();

  const adminLinks = [
    { key: 'dashboard', name: 'Dashboard', to: '/admin/dashboard'},
    { key: 'accounts', name: 'Accounts Management', to: '/admin/accounts'},
    { key: 'departments', name: 'Departments', to: '/admin/departments'},
    { key : 'city', name:'City',to :'/admin/city'},
  ]

  const doctorLinks = [
    { key: 'dashboard', name: 'Dashboard', to: '/doctor/dashboard'},
    { key: 'patients', name: 'Table Patient\'s', to: '/doctor/patients'},
    { key: 'register-patient', name: 'Register Patient', to: '/doctor/register-patient'},
    { key: 'diagnosis', name: 'Patient\'s Diagnosis', to: '/doctor/diagnosis'}
  ]

  const patientLinks = [
    { key: 'dashboard', name: 'Dashboard', to: '/patient/dashboard'},
    { key: 'appointments', name: 'Appointments', to: '/patient/appointments'},
    { key: 'patient-profile', name: 'Patient Profile', to: '/patient/patient-profile'}
  ]

  return (
    <Menu vertical={true} fixed="left" style={{ marginRight: "50px", minWidth: "20vw" }} className='navbar'>
      <Menu.Item style={{ padding: "0px" }}>
        <div className="sidebar-logo-header">
          <img src="/assets/logo.png" alt="logo" />
          <h2 style={{ margin: "0", padding: 0 }}>MEDCARE Hospital</h2>
        </div>
      </Menu.Item>
      <Menu.Item style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Image src="/assets/user.png" size="tiny" circular />
        <h3 style={{ margin: "0 10px", padding: 0 }}>{user?.username}</h3>
      </Menu.Item>
      {user?.role === 'admin' && adminLinks.map(link => (
        <Menu.Item key={link.key} as={NavLink} to={link.to} content={link.name} exact activeClassName='active'/>
      ))}
      {user?.role === 'doctor' && doctorLinks.map(link => (
        <Menu.Item key={link.key} as={NavLink} to={link.to} content={link.name} exact activeClassName='active'/>
      ))}
      {user?.role === 'patient' && patientLinks.map(link => (
        <Menu.Item key={link.key} as={NavLink} to={link.to} content={link.name} exact activeClassName='active'/>
      ))}
      <Menu.Item as={Link} content="Logout" onClick={logout} text="Logout" icon="power"/>
    </Menu>
  );
});
