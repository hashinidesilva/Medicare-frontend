import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import NewPrescription from "./pages/patient/NewPrescription";
import Patients from "./pages/patient/Patients";
import NewPatient from "./pages/patient/NewPatient";
import EditPatient from "./pages/patient/EditPatient";
import PatientHistory from "./pages/patient/PatientHistory";
import PrescriptionHistory from "./pages/patient/PrescriptionHistory";
import EditMedicine from "./pages/inventory/EditMedicine";
import NewMedicine from "./pages/inventory/NewMedicine";
import Medicines from "./pages/inventory/Medicines";
import LowInventory from "./pages/inventory/LowInventory";
import PrescriptionInfo from "./pages/prescription/PrescriptionInfo";
import PrescriptionPdfGenerator from "./pages/prescription/PrescriptionPdfGenerator";
import Prescriptions from "./pages/prescription/Prescriptions";
import DashBoard from "./pages/DashBoard";
import PdfMakerComponent from "./pages/prescription/PdfMakerComponent";

function App() {
  return (
    // <PrescriptionProvider>
    <Layout>
      <Routes>
        <Route path="/home" element={<DashBoard/>}/>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/patients">
          <Route index element={<Patients/>}/>
          <Route path="create" element={<NewPatient/>}/>
          <Route path=":patientId/edit" element={<EditPatient/>}/>
          <Route path=":patientId/prescriptions" element={<PatientHistory/>}/>
          <Route path=":patientId/prescriptions/create" element={<NewPrescription/>}/>
          <Route path=":patientId/prescriptions/:prescriptionId" element={<PrescriptionHistory/>}/>
          <Route path=":patientId/prescriptions/:prescriptionId/edit" element={<NewPrescription/>}/>
        </Route>
        <Route path="/medicines">
          <Route index element={<Medicines/>}/>
          <Route path="create" element={<NewMedicine/>}/>
          <Route path=":medicineId/edit" element={<EditMedicine/>}/>
          <Route path="low-inventory" element={<LowInventory/>}/>
        </Route>
        <Route path="/prescriptions">
          <Route index element={<Prescriptions/>}/>
          <Route path=":prescriptionId" element={<PrescriptionInfo/>}/>
          <Route path=":prescriptionId/pdf" element={<PdfMakerComponent/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/home"/>}/>
      </Routes>
    </Layout>
    // </PrescriptionProvider>
  );
}

export default App;