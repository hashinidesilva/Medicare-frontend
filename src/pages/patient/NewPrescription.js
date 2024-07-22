import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import axios from 'axios';
import CustomProgress from '../../components/UI/CustomProgress';
import PrescriptionForm from '../../components/prescription/PrescriptionForm';
import {calculateTotalPrice} from '../../util/MedicineUtil';

const NewPrescription = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [medicineLoading, setMedicineLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const [patient, setPatient] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const {patientId} = params;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(`/patients/${patientId}`);
        const data = response.data;
        setPatient({
          id: data.id,
          regNo: data.regNo,
          name: data.name,
          age: data.age,
          ageMonths: data.ageMonths,
          gender: data.gender,
          allergies: data.allergies,
        });
      } catch (err) {
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [patientId]);

  useEffect(async () => {
    try {
      setMedicineLoading(true);
      const response = await axios.get('/medicines');
      const data = await response.data;
      const options = data.map(medicine => {
        return {
          id: medicine.id,
          label: medicine.name,
          type: medicine.type,
          units: medicine.units,
          unitPrice: medicine.unitPrice,
        };
      });
      setAvailableMedicines(options);
    } catch (error) {
      setError('Failed to load medicines: ' + error.message);
    } finally {
      setMedicineLoading(false);
    }
  }, []);

  const prescriptionSubmitHandler = async (prescription) => {
    const formattedPrescription = {
      patientId: prescription.patient.id,
      diagnosis: prescription.diagnosis,
      history: prescription.history,
      totalPrice: calculateTotalPrice(prescription.medicines,
          prescription.consultationFee, prescription.investigationFee),
      consultationInfo: prescription.consultationInfo,
      consultationFee: parseFloat(prescription.consultationFee) || 0,
      investigationInfo: prescription.investigationInfo,
      investigationFee: parseFloat(prescription.investigationFee) || 0,
      medicines: prescription.medicines?.filter(
          medication => medication.medicine.name !== '').map(medicine => {
        return {
          additionalInfo: medicine.additionalInfo,
          dose: medicine.dose,
          duration: medicine.duration,
          frequency: medicine.frequency,
          frequencyText: medicine.frequencyText,
          quantity: medicine.quantity,
          medicineId: medicine.medicine.id,
          price: medicine.price,
        };
      }),
    };
    try {
      setSaveLoading(true);
      const response = await axios.post('/prescriptions',
          JSON.stringify(formattedPrescription), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      if (response.status !== 200) {
        throw new Error(`HTTP status ${response.status}: ${response.data}`);
      }
      navigate('/patients');
    } catch (error) {
      setError('Failed to submit prescription: ' + error.message);
      setSaveLoading(false);
    }
  };

  return (
      <>
        {(loading || medicineLoading) && <CustomProgress/>}
        {!loading && !medicineLoading &&
            <PrescriptionForm patient={patient}
                              onSubmit={prescriptionSubmitHandler}
                              error={error}
                              setError={setError}
                              availableMedicines={availableMedicines}
                              loading={saveLoading}
                              onCancel={() => navigate(
                                  '/patients')}/>}
      </>
  );
};

export default NewPrescription;