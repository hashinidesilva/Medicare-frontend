import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import MedicineForm from "./components/medicine/MedicineForm";
import MedicineTable from "./components/medicine/MedicineTable";
import PrescriptionTable from "./components/patients/PrescriptionTable";
import Patients from "./pages/Patients";
import NewPatient from "./pages/NewPatient";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/patients"/>}/>
        <Route path="patients" element={<Patients/>}/>
        <Route path="medicines" element={<MedicineTable/>}/>
        <Route path="new-patient" element={<NewPatient/>}/>
        <Route path="new-medicine" element={<MedicineForm/>}/>
        <Route path="prescription" element={<PrescriptionTable/>}/>
      </Routes>
    </Layout>
  );
}

export default App;