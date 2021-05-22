import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Router, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import TestErrors from '../../features/errors/TestError';
import PatientDashboard from '../../features/patients/dashboard/PatientDashboard';
import PatientDetails from '../../features/patients/details/PatientDetails';
import PatientForm from '../../features/patients/form/PatientForm';
import HomePage from './HomePage';
import NavBar from './NavBar';
import './style.css';

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/patients' component={PatientDashboard} />
                <Route path='/patients/:id' component={PatientDetails} />
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
