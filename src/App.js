import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import NewPrescription from "./pages/NewPrescription";
import Patients from "./pages/Patients";
import NewPatient from "./pages/NewPatient";
import EditPatient from "./pages/EditPatient";
import EditMedicine from "./pages/EditMedicine";
import NewMedicine from "./pages/NewMedicine";
import Medicines from "./pages/Medicines";
import UnprocessedPrescriptions from "./pages/UnprocessedPrescriptions";
import PrescriptionInfo from "./pages/PrescriptionInfo";
import UnprocessedPrescriptionInfo from "./pages/UnprocessedPrescriptionInfo";
import PatientHistory from "./pages/PatientHistory";
import LowInventory from "./pages/LowInventory";
import PrescriptionPdfGenerator from "./pages/PrescriptionPdfGenerator";
import HomePage from "./pages/HomePage";

function App() {
  return (
    // <PrescriptionProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/patients">
          <Route index element={<Patients/>}/>
          <Route path="create" element={<NewPatient/>}/>
          <Route path=":patientId/edit" element={<EditPatient/>}/>
          <Route path=":patientId/prescriptions/create" element={<NewPrescription/>}/>
          <Route path=":patientId/prescriptions/:prescriptionId/edit" element={<NewPrescription/>}/>
          <Route path=":patientId/prescriptions/history" element={<PatientHistory/>}/>
          <Route path=":patientId/prescriptions/history/:prescriptionId" element={<PrescriptionInfo/>}/>
          <Route path=":patientId/prescriptions/:prescriptionId" element={<PrescriptionInfo/>}/>
        </Route>
        <Route path="/medicines">
          <Route index element={<Medicines/>}/>
          <Route path="create" element={<NewMedicine/>}/>
          <Route path=":medicineId/edit" element={<EditMedicine/>}/>
          <Route path="low-inventory" element={<LowInventory/>}/>
        </Route>
        <Route path="/prescriptions">
          <Route index element={<UnprocessedPrescriptions/>}/>
          <Route path=":prescriptionId" element={<UnprocessedPrescriptionInfo/>}/>
          <Route path=":prescriptionId/pdf" element={<PrescriptionPdfGenerator/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/patients"/>}/>
      </Routes>
    </Layout>
    // </PrescriptionProvider>
  );
}

export default App;