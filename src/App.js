import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import MedicineForm from "./components/medicine/MedicineForm";
import MedicineTable from "./components/medicine/MedicineTable";
import PrescriptionTable from "./components/patients/PrescriptionTable";
import Patients from "./pages/Patients";
import NewPatient from "./pages/NewPatient";
import EditPatient from "./components/patients/EditPatient";
import EditMedicine from "./components/medicine/EditMedicine";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/patients"/>}/>
        <Route path="patients" element={<Patients/>}/>
        <Route path="patients/create" element={<NewPatient/>}/>
        <Route path="patients/:patientId/edit" element={<EditPatient/>}/>
        <Route path="medicines" element={<MedicineTable/>}/>
        <Route path="medicines/create" element={<MedicineForm/>}/>
        <Route path="medicines/:medicineId/edit" element={<EditMedicine/>}/>
        <Route path="prescription" element={<PrescriptionTable/>}/>
      </Routes>
    </Layout>
  );
}

export default App;