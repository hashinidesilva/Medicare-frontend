import PatientForm from "./PatientForm";

const EditPatient = ({patient}) => {
  const submitHandler = async (patient) => {
    const response = await fetch("http://localhost:8080/patients", {
      method: 'PUT',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
  };

  return (
    <PatientForm onAddPatient={submitHandler} patient={patient}/>
  );
};

export default EditPatient;