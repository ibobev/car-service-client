import './App.css';
import { Footer} from './components';
import { Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import Register from './views/register/Register';
import Login from './views/login/Login';
import DashboardClient from './views/client/DashboardClient';
import DashboardOwner from './views/owner/DashboardOwner';
import ClientRoutes from './routes/ClientRoutes';
import OwnerRoutes from './routes/OwnerRoutes';
import CarServiceView from './views/client/CarServiceView';
import Employees from './views/owner/Employees';
import RegisterEmployee from './views/employee/RegisterEmployee';
import EmployeeRoutes from './routes/EmployeeRoutes';
import DashboardEmployee from './views/employee/DashboardEmployee';
import CarServiceCompany from './components/car-service-components/CarServiceCompany';
import AppointmentsOwner from './views/owner/AppointmentsOwner';
import TasksEmployee from './views/employee/TasksEmployee';
import CompleteAppointment from './components/appointment/CompleteAppointment';
import ActiveAppointmentsClient from './views/client/ActiveAppointmentsClient';
import Clients from './views/owner/Clients';
import ShowClientInfo from './components/company-clients/ShowClientInfo';
import ServicedCompany from './views/client/ServicedCompany';
import ShowPersonalInfo from './components/company-clients/ShowPersonalInfo';

function App() {

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/employees/register" element={<RegisterEmployee/>} />

        <Route element={<ClientRoutes />}>
          <Route path="/client" element={<DashboardClient/>} />
          <Route path="/client/car-services" element={<CarServiceView/>} />
          <Route path="/client/car-services/:companyId" element={<CarServiceCompany/>} />
          <Route path="/client/appointments" element={<ActiveAppointmentsClient/>} />
          <Route path="/client/history" element={<ServicedCompany/>} />
          <Route path="/client/reports/company/:companyId/:clientId" element={<ShowPersonalInfo/>}/>
        </Route>

        <Route element={<OwnerRoutes />} >
            <Route path="/owner" element={<DashboardOwner/>}/>
            <Route path="/owner/employees" element={<Employees/>}/>
            <Route path="/owner/appointments" element={<AppointmentsOwner/>}/>
            <Route path="/owner/tasks/:appointmentId" element={<CompleteAppointment/>}/>
            <Route path="/owner/reports/" element={<Clients/>}/>
            <Route path="/owner/reports/:clientId" element={<ShowClientInfo/>}/>
        </Route>

        <Route element={<EmployeeRoutes/>}>
            <Route path="/employee" element={<DashboardEmployee/>}/>
            <Route path="/employee/tasks" element={<TasksEmployee/>} />
            <Route path="/employee/tasks/:appointmentId" element={<CompleteAppointment/>}/>
            <Route path="/employee/reports/" element={<Clients/>}/>
            <Route path="/employee/reports/:clientId" element={<ShowClientInfo/>}/>
        </Route>

      </Routes>
      <div className="footer-spacing"></div>
      <Footer/>
    
    </div>
  );
}

export default App;
