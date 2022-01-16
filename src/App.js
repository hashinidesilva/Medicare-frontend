import { Route, Routes } from "react-router-dom";

import PatientForm from "./components/patient/PatientForm";
import Layout from "./components/layout/Layout";
import MedicineForm from "./components/medicine/MedicineForm";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PatientForm/>}/>
        <Route path="new-patient" element={<PatientForm/>}/>>
        <Route path="new-medicine" element={<MedicineForm/>}/>>
      </Routes>
    </Layout>
  );
}

export default App;