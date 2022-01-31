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
          <Route path="/patients">
            <Route index element={<Patients/>}/>
            <Route path="create" element={<NewPatient/>}/>
            <Route path=":patientId/edit" element={<EditPatient/>}/>
            <Route path=":patientId/prescriptions/create" element={<NewPrescription/>}/>
            <Route path=":patientId/prescriptions" element={<PatientHistory/>}/>
          </Route>
          <Route path="/medicines">
            <Route index element={<Medicines/>}/>
            <Route path="create" element={<NewMedicine/>}/>
            <Route path=":medicineId/edit" element={<EditMedicine/>}/>
          </Route>
          <Route path="/prescriptions">
            <Route index element={<UnprocessedPrescriptions/>}/>
            <Route path=":prescriptionId" element={<PrescriptionInfo/>}/>
          </Route>
        </Routes>
      </Layout>
    </PrescriptionProvider>
  );
}

export default App;