import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { Route, Router, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container, Grid, Modal, Segment } from 'semantic-ui-react';
import AdminDashboard from '../../features/admin/dashboard/AdminDashboard';
import DoctorDashboard from '../../features/doctor/dashboard/DoctorDashboard';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import TestErrors from '../../features/errors/TestError';
import PatientForm from '../../features/patients/form/PatientForm';
import ModalContainer from '../common/modals/ModalContainer';
import { useStore } from '../stores/store';
import HomePage from './HomePage';
import LoadingComponent from './LoadingComponent';
import NavBar from '../../features/admin/dashboard/NavBar';
import PrivateRoute from './PrivateRoute';
import './style.css';
import AdminAppointmentPage from '../../features/admin/appointments/AdminAppointmentPage';
import DepartmentsPage from '../../features/admin/departments/DepartmentsPage';
import AppointmetsPatient from '../../features/doctor/AppointmetsPatient';
import PatientProfile from '../../features/patients/my-profile/PatientProfile';
import RegisterPatient from '../../features/doctor/RegisterPatient';
import AdminAccountsTable from '../../features/admin/accounts/AdminAccountsTable';


function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore()

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container fluid style={{padding: '20px 20px 0 22vw'}}>
              <Switch>
                <PrivateRoute exact path='/admin' component={AdminDashboard} />
                <PrivateRoute path='/admin/accounts' component={AdminAccountsTable} />
                <PrivateRoute path='/admin/appointments' component={AdminAppointmentPage} />
                <PrivateRoute path='/admin/departments' component={DepartmentsPage} />

                <PrivateRoute exact path='/doctor' component={DoctorDashboard} />
                <PrivateRoute exact path='/doctor/patientprofile' component={PatientProfile} />
                {/* <PrivateRoute exact path='/patient' component={PatientDashboard} /> */}
                
              

                <PrivateRoute exact path='/doctor/AppointmetsPatient' component={AppointmetsPatient} />
                <PrivateRoute exact path='/doctor/RegisterPatient' component={RegisterPatient} />




                <Route key={location.key} path={['/createPatient', '/manage/:id']} component={PatientForm} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);


/*
<Segment style={{margin: '0 0 0 20vw'}}>
              <Switch>
                <PrivateRoute exact path='/admin' component={AdminDashboard} />
                <PrivateRoute path='/admin/appointments' component={AdminAppointmentPage} />
                <PrivateRoute exact path='/doctor' component={DoctorDashboard} />
                <PrivateRoute exact path='/patient' component={PatientDashboard} />


                <Route key={location.key} path={['/createPatient', '/manage/:id']} component={PatientForm} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Segment>
            */