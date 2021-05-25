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
import PatientDashboard from '../../features/patients/dashboard/PatientDashboard';
import PatientDetails from '../../features/patients/details/PatientDetails';
import PatientForm from '../../features/patients/form/PatientForm';
import LoginForm from '../../features/users/LoginForm';
import ModalContainer from '../common/modals/ModalContainer';
import { useStore } from '../stores/store';
import HomePage from './HomePage';
import LoadingComponent from './LoadingComponent';
import NavBar from '../../features/admin/dashboard/NavBar';
import PrivateRoute from './PrivateRoute';
import './style.css';
import AdminAppointmentPage from '../../features/admin/appointments/AdminAppointmentPage';

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
                <PrivateRoute path='/admin/appointments' component={AdminAppointmentPage} />
                <PrivateRoute exact path='/doctor' component={DoctorDashboard} />
                <PrivateRoute exact path='/patient' component={PatientDashboard} />


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