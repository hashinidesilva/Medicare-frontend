import { Route, Routes } from "react-router-dom";

import PatientForm from "./components/patient/PatientForm";
import Layout from "./components/layout/Layout";
import MedicineForm from "./components/medicine/MedicineForm";
import MedicineTable from "./components/medicine/MedicineTable";
import PatientsTable from "./components/patient/PatientsTable";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PatientForm/>}/>
        <Route path="patients" element={<PatientsTable/>}/>
        <Route path="medicines" element={<MedicineTable/>}/>
        <Route path="new-patient" element={<PatientForm/>}/>
        <Route path="new-medicine" element={<MedicineForm/>}/>
      </Routes>
    </Layout>
  );
}

export default App;