import Table from "../UI/Table";

const MedicationsTable = ({medications = []}) => {

  const medicines = medications.map(medication => {
    return {
      id: medication.medicine.id,
      name: medication.medicine.name,
      type: medication.medicine.type,
      dose: medication.dose,
      frequency: medication.frequency,
      duration: medication.duration,
      quantity: medication.quantity,
      additionalInfo: medication.additionalInfo,
    };
  });

  const columns = [
    {field: 'name', headerName: 'Medicine', width: '300'},
    {field: 'type', headerName: 'Type', flex: 0.5},
    {field: 'dose', headerName: 'Dose', flex: 0.75},
    {field: 'frequency', headerName: 'Frequency', flex: 0.75},
    {field: 'duration', headerName: 'Duration', flex: 0.5},
    {field: 'quantity', headerName: 'Quantity', flex: 1},
    {field: 'additionalInfo', headerName: 'Additional Info', flex: 2},
  ];

  return (
    <Table columns={columns} rows={medicines}/>
  );
};

export default MedicationsTable;