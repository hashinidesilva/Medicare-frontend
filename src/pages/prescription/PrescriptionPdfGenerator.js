import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import jsPDF from "jspdf";

const PrescriptionPdfGenerator = () => {
  const [prescription, setPrescription] = useState({});
  const [pdfBlob, setPdfBlob] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const params = useParams();
  const {prescriptionId} = params;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/medicare/v1/prescriptions/${prescriptionId}`);
      const data = await response.data;
      const doc = new jsPDF();
      doc.text("Prescription Details", 10, 10);
      doc.text("Patient Name: John Doe", 10, 20);
      doc.text("Medicine: XYZ", 10, 30);
      doc.text("Dosage: 10mg", 10, 40);

      const generatedPdfBlob = doc.output('blob');
      setPdfBlob(generatedPdfBlob);

      setPdfUrl(URL.createObjectURL(generatedPdfBlob));
      setPrescription(data);
    }

    fetchData();
  }, [prescriptionId]);

  // const doc = new jsPDF();
  // doc.text("Prescription Details", 10, 10);
  // doc.text("Patient Name: John Doe", 10, 20);
  // doc.text("Medicine: XYZ", 10, 30);
  // doc.text("Dosage: 10mg", 10, 40);
  //
  // const generatedPdfBlob = doc.output('blob');
  // setPdfBlob(generatedPdfBlob);
  //
  // setPdfUrl(URL.createObjectURL(generatedPdfBlob));

  return (
    <iframe src={pdfUrl} title="PDF Preview" width="100%" height="500px" style={{ border: 'none' }}></iframe>
  )
};

export default PrescriptionPdfGenerator;