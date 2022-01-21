import { Navigate, Route, Routes } from "react-router-dom";

import PatientForm from "./components/patient/PatientForm";
import Layout from "./components/layout/Layout";
import MedicineForm from "./components/medicine/MedicineForm";
import MedicineTable from "./components/medicine/MedicineTable";
import PatientsTable from "./components/patient/PatientsTable";
import PrescriptionTable from "./components/patient/PrescriptionTable";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/patients" />}/>
        <Route path="patients" element={<PatientsTable/>}/>
        <Route path="medicines" element={<MedicineTable/>}/>
        <Route path="new-patient" element={<PatientForm/>}/>
        <Route path="new-medicine" element={<MedicineForm/>}/>
        <Route path="prescriptions" element={<PrescriptionTable/>}/>
      </Routes>
    </Layout>
  );
}

export default App;