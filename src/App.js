import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import MedicineForm from "./components/medicine/MedicineForm";
import MedicineTable from "./components/medicine/MedicineTable";
import PatientsTable from "./components/patients/PatientsTable";
import Patient from "./components/patients/patient/Patient";
import PrescriptionTable from "./components/patients/PrescriptionTable";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/patients"/>}/>
        <Route path="patients" element={<PatientsTable/>}/>
        <Route path="medicines" element={<MedicineTable/>}/>
        <Route path="new-patient" element={<Patient/>}/>
        <Route path="new-medicine" element={<MedicineForm/>}/>
        <Route path="prescriptions" element={<PrescriptionTable/>}/>
      </Routes>
    </Layout>
  );
}

export default App;