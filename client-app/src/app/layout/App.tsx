import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Router, Switch, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
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
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/patients' component={PatientDashboard} />
              <Route path='/patients/:id' component={PatientDetails} />
              <Route key={location.key} path={['/createPatient', '/manage/:id']} component={PatientForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
