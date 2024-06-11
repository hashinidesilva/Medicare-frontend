import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";

import axios from "axios";
import jsPDF from "jspdf";
import LetterHead from "../../components/pdf/LetterHead";
import PrescriptionPDFOriginal from "../../components/pdf/PrescriptionPDFOriginal";
import PrescriptionPDF from "../../components/pdf/PrescriptionPDF";
import { PDFViewer } from "@react-pdf/renderer";
import { format } from "date-fns";

const {vfs} = vfsFonts.pdfMake;
pdfMake.vfs = vfs;

const PrescriptionPdfGenerator = () => {
  const [prescription, setPrescription] = useState({});
  const [pdfBlob, setPdfBlob] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const params = useParams();
  const {prescriptionId} = params;


  const getImageBase64 = (url) => {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });
  };
  //
  // const [logo, setLogo] = useState('');
  //
  // useEffect(() => {
  //   getImageBase64('/bklogo.jpeg').then(setLogo).catch(error => console.error(error));
  // }, []);
  //
  // useEffect(() => {
  //   if (logo && prescription?.patient) {
  //     generatePDF(logo);
  //   }
  // }, [logo, prescription]);


  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/medicare/v1/prescriptions/${prescriptionId}`);
      const data = await response.data;
      // const doc = new jsPDF();
      // doc.text("PrescriptionPDFOriginal Details", 10, 10);
      // doc.text("Patient Name: John Doe", 10, 20);
      // doc.text("Medicine: XYZ", 10, 30);
      // doc.text("Dosage: 10mg", 10, 40);
      //
      // const generatedPdfBlob = doc.output('blob');
      // setPdfBlob(generatedPdfBlob);
      //
      // setPdfUrl(URL.createObjectURL(generatedPdfBlob));
      console.log("DAA", data);
      setPrescription(data);
      // generatePDF(data);
    }

    fetchData();
  }, [prescriptionId]);

  // const generatePDF = (patientData) => {
  //   const docDefinition = {
  //     content: [
  //       {
  //         image: logo,
  //         width: 150,
  //         height:70,
  //         alignment: 'left',
  //       },
  //       // {
  //       //   text: 'BK HEALTH CARE (PVT) LTD',
  //       //   style: 'header',
  //       //   alignment: 'center'
  //       // },
  //       {
  //         text: 'Dr. G.H.J De Silva',
  //         // style: 'header',
  //         alignment: 'right'
  //       },
  //       {
  //         text: [
  //           {text: 'Date and Time: ', bold: true},
  //           `${new Date().toLocaleString()}\n`
  //         ]
  //       },
  //       {
  //         text: [
  //           {text: 'Patient ID: ', bold: true},
  //           `${patientData.nic}\n`
  //         ]
  //       },
  //       {
  //         text: [
  //           {text: 'Name of the client: ', bold: true},
  //           `${patientData.name}\n`
  //         ]
  //       },
  //       {
  //         text: [
  //           {text: 'Age: ', bold: true},
  //           `${patientData.age}\n`
  //         ]
  //       },
  //       {
  //         text: [
  //           {text: 'Sex: ', bold: true},
  //           `${patientData.gender}\n`
  //         ]
  //       },
  //       {
  //         text: [
  //           {text: 'Diagnosis: ', bold: true},
  //           `${patientData.diagnosis}\n`
  //         ]
  //       },
  //       {
  //         text: [
  //           {text: 'Investigations and Management: ', bold: true},
  //           `${patientData.history}\n`
  //         ]
  //       },
  //       {
  //         text: [
  //           {text: 'Prescription: ', bold: true},
  //           `${patientData.nic}` // assuming prescription is an array of strings
  //         ]
  //       }
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //         margin: [0, 0, 0, 10] // left, top, right, bottom
  //       }
  //     }
  //   };
  //
  //   // Open PDF in new window (for web applications)
  //   pdfMake.createPdf(docDefinition).open();
  // };

  // useEffect(async () => {
  //   if (prescription?.patient) {
  //     const {patient, diagnosis, history, medicines, createdTime} = prescription;
  //     const medicineList = medicines?.map(item => item.medicine.name);
  //     const doc = new jsPDF();
  //
  //     try {
  //       // Load the logo
  //       const logo = await loadImage('/bklogo.jpeg'); // Replace with the path to your logo
  //
  //       // Convert image for jspdf
  //       const canvas = document.createElement("canvas");
  //       canvas.width = logo.width;
  //       canvas.height = logo.height;
  //       const context = canvas.getContext("2d");
  //       context.drawImage(logo, 0, 0, logo.width, logo.height);
  //       const imageData = canvas.toDataURL("image/jpeg");
  //
  //       // Add logo to PDF
  //       doc.addImage(imageData, 'JPEG', 12, 10, 40, 20); // x, y, width, height
  //
  //       // Add letter head text next to logo
  //       doc.setFontSize(11);
  //       doc.text("Dr. G.H.J De Silva", 155, 15);
  //       doc.text("MD (Medicine & Surgery)", 155, 22);
  //       doc.text("SLMC Reg No: 35436", 155, 29);
  //
  //       // Add registration below logo
  //       doc.setFontSize(11);
  //       doc.text("BR Registration: PV – 00258881", 13, 40);
  //       doc.text("MOH Registration: PHSRC/FGP/655", 135, 40);
  //       doc.setFontSize(10.3);
  //       doc.text("BK HEALTH CARE (PVT) LTD, SPRINGVALLEY ROAD, NAULLA, DEMODERA, SRI LANKA. Tel: +94 779569965", 13, 50);
  //
  //       // Draw a line
  //       doc.setDrawColor(0);
  //       doc.line(13, 55, 200, 55); // x1, y1, x2, y2
  //
  //       // Add patient information
  //       doc.setFontSize(12);
  //       doc.text(`Date and Time: ${format(new Date(createdTime), 'yyyy-MM-dd HH:mm')}`, 13, 60);
  //       doc.text(`Patient ID #: ${patient.nic}`, 13, 70);
  //       doc.text(`Name of the client: ${patient.name}`, 13, 80);
  //       doc.text(`Age: ${patient.age}`, 13, 90);
  //       doc.text(`Sex: ${patient.gender}`, 13, 100);
  //       doc.text(`Diagnosis: ${diagnosis}`, 13, 110);
  //       doc.text(`Diagnosis: ${diagnosis}`, 15, 115, { maxWidth: 180, align: "left" });
  //
  //       // Assuming `investigations` and `prescription` are arrays
  //       doc.text(`Investigations and Management: ${history}`, 13, 120);
  //
  //       doc.text(`Prescription: `, 15, 140);
  //       // patientData.prescription.forEach((item, index) => {
  //       //   doc.text(item, 15, 150 + ((patientData.investigations.length + index) * 10));
  //       // });
  //
  //       // Save the created PDF
  //       // doc.save('patient-details.pdf');
  //       const generatedPdfBlob = doc.output('blob');
  //       setPdfBlob(generatedPdfBlob);
  //
  //       setPdfUrl(URL.createObjectURL(generatedPdfBlob));
  //
  //     } catch (error) {
  //       console.error('Error generating PDF:', error);
  //     }
  //   }
  // }, [prescription]);

  // const doc = new jsPDF();
  // doc.text("PrescriptionPDFOriginal Details", 10, 10);
  // doc.text("Patient Name: John Doe", 10, 20);
  // doc.text("Medicine: XYZ", 10, 30);
  // doc.text("Dosage: 10mg", 10, 40);
  //
  // const generatedPdfBlob = doc.output('blob');
  // setPdfBlob(generatedPdfBlob);
  //
  // setPdfUrl(URL.createObjectURL(generatedPdfBlob));

  return (
    // <div>Loading</div>
    // <LetterHead/>
    <PDFViewer style={{width: '100%', height: '500px'}}>
       <PrescriptionPDF prescription={prescription}/>
     </PDFViewer>
    // <PrescriptionPDFOriginal prescription={prescription}/>
    // <iframe src={pdfUrl} title="PDF Preview" width="100%" height="500px" style={{border: 'none'}}></iframe>
  );
};

export default PrescriptionPdfGenerator;