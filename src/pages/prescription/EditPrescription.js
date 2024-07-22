import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import axios from 'axios';
import PrescriptionForm from '../../components/prescription/PrescriptionForm';
import CustomProgress from '../../components/UI/CustomProgress';
import {calculateTotalPrice} from '../../util/MedicineUtil';

const EditPrescription = () => {
  const [error, setError] = useState('');
  const [prescription, setPrescription] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const {prescriptionId} = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios({
          method: 'GET',
          url: `/prescriptions/${prescriptionId}`,
        });
        if (response.status === 200) {
          setPrescription(response.data);
        }
      } catch (err) {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      setPrescription({});
    };
  }, [prescriptionId, navigate]);

  useEffect(() => {
    if (prescription?.processed) {
      navigate('/');
    }
  }, [prescription?.processed, navigate]);

  useEffect(async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  }, []);

  const updatePrescriptionSubmitHandler = async (updatedPrescription) => {
    const formattedPrescription = {
      diagnosis: updatedPrescription.diagnosis,
      history: updatedPrescription.history,
      totalPrice: calculateTotalPrice(updatedPrescription.medicines,
          updatedPrescription.consultationFee,
          updatedPrescription.investigationFee),
      consultationInfo: updatedPrescription.consultationInfo,
      consultationFee: parseFloat(updatedPrescription.consultationFee) || 0,
      investigationInfo: updatedPrescription.investigationInfo,
      investigationFee: parseFloat(updatedPrescription.investigationFee) || 0,
      medicines: updatedPrescription.medicines?.filter(
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
      setUpdateLoading(true);
      const response = await axios.put(`/prescriptions/${prescriptionId}`,
          JSON.stringify(formattedPrescription), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      if (response.status !== 200) {
        throw new Error(`HTTP status ${response.status}: ${response.data}`);
      }
      navigate(-1);
    } catch (error) {
      setError('Failed to update prescription: ' + error.message);
      setUpdateLoading(false);
    }
  };

  return (
      <>
        {loading && <CustomProgress/>}
        {!loading && <PrescriptionForm patient={prescription?.patient}
                                       onSubmit={updatePrescriptionSubmitHandler}
                                       error={error} setError={setError}
                                       initialPrescription={prescription}
                                       availableMedicines={availableMedicines}
                                       loading={updateLoading}
                                       onCancel={() => navigate(-1)}/>
        }
      </>
  );
};

export default EditPrescription;