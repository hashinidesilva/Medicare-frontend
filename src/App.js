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
import PrescriptionProvider from "./store/PrescriptionProvider";
import PrescriptionInfo from "./pages/PrescriptionInfo";
import PatientHistory from "./pages/PatientHistory";

function App() {
  return (
    <PrescriptionProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/patients"/>}/>
          <Route path="patients" element={<Patients/>}/>
          <Route path="patients/create" element={<NewPatient/>}/>
          <Route path="patients/:patientId/edit" element={<EditPatient/>}/>
          <Route path="patients/:patientId/prescriptions/create" element={<NewPrescription/>}/>
          <Route path="patients/:patientId/prescriptions" element={<PatientHistory/>}/>
          <Route path="medicines" element={<Medicines/>}/>
          <Route path="medicines/create" element={<NewMedicine/>}/>
          <Route path="medicines/:medicineId/edit" element={<EditMedicine/>}/>
          <Route path="prescriptions" element={<UnprocessedPrescriptions/>}/>
          <Route path="prescriptions/:prescriptionId" element={<PrescriptionInfo/>}/>
        </Routes>
      </Layout>
    </PrescriptionProvider>
  );
}

export default App;