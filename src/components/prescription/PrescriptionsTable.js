import Table from '../UI/Table';
import {calculateTotalPrice} from '../../util/MedicineUtil';

const columns = [
  {
    field: 'name', headerName: 'Medicine', width: '280',
    renderCell: (params) => (
        <span style={{
          fontWeight: params.row.name === 'Total'
              ? 'bold'
              : 'normal',
        }}>
          {params.value}
        </span>),
  },
  {field: 'frequencyText', headerName: 'Frequency', flex: 1},
  {field: 'dose', headerName: 'Dose', flex: 0.7},
  {field: 'frequency', headerName: 'Frequency', flex: 0.75},
  {field: 'duration', headerName: 'Duration', flex: 0.7},
  {field: 'quantity', headerName: 'Quantity', flex: 0.7},
  {field: 'additionalInfo', headerName: 'Additional Info', flex: 1.5},
  {
    field: 'price', headerName: 'Price (Rs)', flex: 0.8,
    renderCell: (params) => (
        <span style={{
          fontWeight: params.row.name === 'Total'
              ? 'bold'
              : 'normal',
          textAlign: 'right',
          display: 'block',
        }}>
          {params.value}
        </span>
    ),
  }];

const PrescriptionsTable = ({
  medications = [],
  consultationFee = 0,
  investigationFee = 0,
  hideFooter = false,
}) => {
  const medicines = medications?.filter(
      medication => medication.medicine.name !== '').
      map((medication, index) => {
        return {
          id: index,
          name: medication?.medicine?.name,
          dose: medication.dose,
          frequency: medication.frequency,
          frequencyText: medication.frequencyText,
          duration: medication.duration,
          quantity: medication.quantity,
          additionalInfo: medication.additionalInfo,
          price: medication.price > 0
              ? medication.price
              : medication.medicine?.unitPrice *
              medication.quantity,
        };
      });

  const totalPrice = calculateTotalPrice(medicines, consultationFee,
      investigationFee);

  const consultationRow = {
    id: medicines?.length,
    name: 'Consultation',
    dose: '',
    frequency: '',
    frequencyText: '',
    duration: '',
    quantity: '',
    additionalInfo: '',
    price: consultationFee || 0,
  };

  const investigationRow = {
    id: medicines?.length + 1,
    name: 'Investigation',
    dose: '',
    frequency: '',
    frequencyText: '',
    duration: '',
    quantity: '',
    additionalInfo: '',
    price: investigationFee || 0,
  };

  const totalRow = {
    id: medicines?.length + 2,
    name: 'Total',
    dose: '',
    frequency: '',
    frequencyText: '',
    duration: '',
    quantity: '',
    additionalInfo: '',
    price: totalPrice,
  };
  return (
      <Table columns={columns}
             rows={[...medicines, consultationRow, investigationRow, totalRow]}
             hideFooter={hideFooter}/>
  );
};

export default PrescriptionsTable;