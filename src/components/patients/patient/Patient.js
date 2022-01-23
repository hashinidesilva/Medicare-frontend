import { useState } from "react";

import PatientForm from "./PatientForm";
import PrescriptionTable from "../PrescriptionTable";

const Patient = () => {
  const [newPatient, setNewPatient] = useState(null);

  const addPatientHandler = (patient) => {
    setNewPatient(patient);
  };

  return (
    <>
      {!newPatient && <PatientForm onAddPatient={addPatientHandler}/>}
      {newPatient && <PrescriptionTable patient={newPatient}/>}
    </>
  );
};

export default Patient;