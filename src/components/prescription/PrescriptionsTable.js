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
  {field: 'dose', headerName: 'Dose', flex: 0.75},
  {field: 'frequency', headerName: 'Frequency', flex: 0.75},
  {field: 'duration', headerName: 'Duration', flex: 0.75},
  {field: 'quantity', headerName: 'Quantity', flex: 1},
  {field: 'additionalInfo', headerName: 'Additional Info', flex: 1.5},
  {
    field: 'price', headerName: 'Price (Rs)', flex: 1,
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
  hideFooter = false,
}) => {
  const medicines = medications.map((medication, index) => {
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

  const totalPrice = calculateTotalPrice(medicines);

  const totalRow = {
    id: medicines?.length,
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
             rows={[...medicines, totalRow]}
             hideFooter={hideFooter}/>
  );
};

export default PrescriptionsTable;