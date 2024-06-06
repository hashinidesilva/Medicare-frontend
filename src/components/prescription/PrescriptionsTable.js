import Table from "../UI/Table";

const PrescriptionsTable = ({medications = []}) => {
  const medicines = medications.map((medication, index) => {
    return {
      id: index,
      name: medication.medicineName ?? medication?.medicine?.name,
      dose: medication.dose,
      frequency: medication.frequency,
      frequencyText: medication.frequencyText,
      duration: medication.duration,
      quantity: medication.quantity,
      additionalInfo: medication.additionalInfo,
    };
  });

  const columns = [
    {field: 'name', headerName: 'Medicine', width: '300'},
    {field: 'frequencyText', headerName: 'Frequency', flex: 0.75},
    {field: 'dose', headerName: 'Dose', flex: 0.75},
    {field: 'frequency', headerName: 'Frequency', flex: 0.75},
    {field: 'duration', headerName: 'Duration', flex: 0.75},
    {field: 'quantity', headerName: 'Quantity', flex: 1},
    {field: 'additionalInfo', headerName: 'Additional Info', flex: 2},
  ];

  return (
    <Table columns={columns} rows={medicines}/>
  );
};

export default PrescriptionsTable;