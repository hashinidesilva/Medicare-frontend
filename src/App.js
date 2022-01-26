import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import PrescriptionPage from "./pages/PrescriptionPage";
import Patients from "./pages/Patients";
import NewPatient from "./pages/NewPatient";
import EditPatient from "./pages/EditPatient";
import EditMedicine from "./pages/EditMedicine";
import NewMedicine from "./pages/NewMedicine";
import Medicines from "./pages/Medicines";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/patients"/>}/>
        <Route path="patients" element={<Patients/>}/>
        <Route path="patients/create" element={<NewPatient/>}/>
        <Route path="patients/:patientId/edit" element={<EditPatient/>}/>
        <Route path="patients/:patientId/prescriptions" element={<PrescriptionPage/>}/>
        <Route path="medicines" element={<Medicines/>}/>
        <Route path="medicines/create" element={<NewMedicine/>}/>
        <Route path="medicines/:medicineId/edit" element={<EditMedicine/>}/>
      </Routes>
    </Layout>
  );
}

export default App;