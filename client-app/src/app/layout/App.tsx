import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import TestErrors from '../../features/errors/TestError';
import ModalContainer from '../common/modals/ModalContainer';
import { useStore } from '../stores/store';
import HomePage from './HomePage';
import LoadingComponent from './LoadingComponent';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';
import './style.css';
import DepartmentsPage from '../../features/admin/departments/DepartmentsPage';
import PatientProfile from '../../features/patients/my-profile/PatientProfile';
import RegisterPatient from '../../features/doctor/RegisterPatient';
import AdminAccountsTable from '../../features/admin/accounts/AdminAccountsTable';
import PatientDashboard from '../../features/patients/dashboard/PatientDashboard';
import DoctorPatientsTable from '../../features/doctor/patients/DoctorPatientsTable';
import Diagnosis from '../../features/doctor/diagnosis/Diagnosis';
import AnalysisTable from '../../features/doctor/analysis/AnalysisTable';
import CityTable from '../../features/admin/city/CityTable';
import PharmacyProductTable from '../../features/admin/pharmacyProducts/PharmacyProductTable';
import BloodManagment from '../../features/doctor/bloodBank/BloodManagment';
import PatientAppointments from '../../features/patients/appointments/PatientAppointments';
import MedicalReportsTable from '../../features/doctor/medicalReports/MedicalReportsTable';
import AdminAppointments from '../../features/admin/appointments/AdminAppointments';


function App() {
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
      <ToastContainer position='top-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container fluid style={{ padding: '20px 20px 0 22vw' }}>
              <Switch>
                {/* Admin Routes */}
                <PrivateRoute path='/admin/accounts' component={AdminAccountsTable} />
                <PrivateRoute path='/admin/departments' component={DepartmentsPage} />
                <PrivateRoute path='/admin/city/' component={CityTable}/>
                <PrivateRoute path='/admin/pharmacyProducts/' component={PharmacyProductTable}/>
                <PrivateRoute path='/admin/appointments/' component={AdminAppointments}/>



                {/* Doctor Routes */}
                <PrivateRoute exact path='/doctor/register-patient' component={RegisterPatient} />
                <PrivateRoute exact path='/doctor/diagnosis' component={ Diagnosis } />
                <PrivateRoute exact path='/doctor/patients' component={DoctorPatientsTable} />
                <PrivateRoute exact path='/doctor/bloodBank' component={BloodManagment} />
                <PrivateRoute exact path='/doctor/analysis' component={AnalysisTable} />
                <PrivateRoute exact path='/doctor/medicalReports' component={MedicalReportsTable} />


                
                {/* {Patient Routes} */}
                <PrivateRoute exact path='/patient/dashboard' component={PatientDashboard} />
                <PrivateRoute exact path='/patient/appointments' component={PatientAppointments} />
                <PrivateRoute exact path='/patient/patient-profile' component={PatientProfile} />
                

                {/* Extra Routes */}
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
)
}

export default observer(App);