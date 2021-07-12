import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Image, Label, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const { userStore: { user, logout }, profileStore: {selectedDoctor: doctor, loadDoctor} } = useStore();

  useEffect(() => {
    if(user && user.role === 'doctor') loadDoctor(user.id);
  }, [user, loadDoctor])

  const adminLinks = [
    { key: 'dashboard', name: 'Dashboard', to: '/admin' },
    { key: 'accounts', name: 'Accounts Management', to: '/admin/accounts' },
    { key: 'appointments', name: 'Appointments', to: '/admin/appointments' },
    { key: 'countries', name: 'Countries, Cities and Nationalities', to: '/admin/countries' },
    { key: 'specialties', name: 'Doctor Specialties', to: '/admin/specialties' },
    { key: 'departments', name: 'Departments', to: '/admin/departments' },
    { key: 'rooms', name: 'Room Management', to: '/admin/rooms' },
    { key: 'pharmacyProducts', name: 'Pharmacy Products', to: '/admin/pharmacyProducts' },
    { key: 'registeredPatients', name: 'Registered Patients', to: '/admin/registeredPatients' },
  ]

  const doctorLinks = [
    { key: 'dashboard', name: 'Dashboard', to: '/doctor' },
    { key: 'appointments', name: 'Appointments', to: '/doctor/appointments' },
    { key: 'patients', name: 'Patients', to: '/doctor/patients' },
    { key: 'register-patient', name: 'Register Patients', to: '/doctor/register-patient' },
    { key: 'diagnosis', name: 'Patients Diagnosis', to: '/doctor/diagnosis' },
    { key: 'analysis', name: 'Patients Analysis', to: '/doctor/analysis' },
    { key: 'bloodBank', name: 'Blood Bank Management', to: '/doctor/bloodBank' },
    { key: 'medicalReports', name: 'Medical Reports', to: '/doctor/medicalReports' },
    { key: 'profile', name: 'My Profile', to: '/doctor/profile' }
  ]

  const patientLinks = [
    { key: 'dashboard', name: 'Dashboard', to: '/patient' },
    { key: 'appointments', name: 'Appointments', to: '/patient/appointments' },
    { key: 'pharmacy-table', name: 'Online Pharmacy', to: '/patient/pharmacy-table'},
    { key: 'healthDatas', name: 'PHR', to: '/patient/healthDatas'},
    { key: 'medicalReports', name: 'My Medical Reports', to: '/patient/medicalReports' },   
    { key: 'analysis', name: 'Analysis Result', to: '/patient/patient-analysis' },
    { key: 'vaccinations', name: 'Vaccinations', to: '/patient/vaccinations' },
    { key: 'patient-profile', name: 'My Profile', to: '/patient/patient-profile' },
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
        {user?.role === 'doctor' ? 
          <Image src={doctor?.image ||  `/assets/user.png`} size="tiny" circular /> : 
          <Label style={{marginBottom: 3}} circular color='blue' size='massive' content={`${user?.firstName[0]}${user?.lastName[0]}`} />
        }
        <h3 style={{ margin: "0 10px", padding: 0 }}>{user?.firstName + ' ' + user?.lastName}</h3>
      </Menu.Item>
      {user?.role === 'admin' && adminLinks.map(link => (
        <Menu.Item key={link.key} as={NavLink} to={link.to} content={link.name} exact activeClassName='active' />
      ))}
      {user?.role === 'doctor' && doctorLinks.map(link => (
        <Menu.Item key={link.key} as={NavLink} to={link.to} content={link.name} exact activeClassName='active' />
      ))}
      {user?.role === 'patient' && patientLinks.map(link => (
        <Menu.Item key={link.key} as={NavLink} to={link.to} content={link.name} exact activeClassName='active' />
      ))}
      <Menu.Item as={Link} content="Logout" onClick={logout} text="Logout" icon="power" />
    </Menu>
  );
});
