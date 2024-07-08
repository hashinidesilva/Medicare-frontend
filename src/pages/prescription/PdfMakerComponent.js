import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import {format} from 'date-fns';
import api from '../../components/api/api';

const PdfMakerComponent = () => {
  const {vfs} = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;
  const [base64Image, setBase64Image] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [prescription, setPrescription] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const {prescriptionId} = params;

  const cityId = localStorage.getItem('city');

  useEffect(() => {
    fetch('/bklogo.jpeg').then(response => response.blob()).then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(blob);
    }).catch(e => console.log('Error loading image:', e));
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/prescriptions/${prescriptionId}`);
        const data = await response.data;
        setPrescription(data);
      } catch (err) {
        navigate('/');
      }
    }

    fetchData();
  }, [prescriptionId]);

  useEffect(() => {
    if (base64Image && prescription?.patient) {
      generatePdf();
    }
  }, [base64Image, prescription]);

  useEffect(() => {
    return () => {
      // Clean up the blob URL
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
    };
  }, [pdfUrl]);

  const generatePdf = () => {
    const {patient, diagnosis, history, medicines, createdTime} = prescription;
    const medicineList = medicines?.map(item => item.medicine.name);

    const docDefinition = {
      content: [
        {
          columns: [
            {
              image: base64Image,
              width: 150,
              height: 70,
              alignment: 'left',
              margin: [0, 0, 0, 10],
            },
            {
              margin: [0, 12, 0, 0],
              width: '*',
              stack: [
                {
                  text: 'Dr. G.H.J De Silva',
                  alignment: 'right',
                  bold: true,
                  fontSize: 11,
                  margin: [0, 0, 0, 5],
                },
                {
                  text: 'MD (Medicine & Surgery)',
                  alignment: 'right',
                  bold: true,
                  fontSize: 11,
                  margin: [0, 0, 0, 5], // Adjust margin to add space below this line
                },
                {
                  text: 'SLMC Reg No: 35436',
                  alignment: 'right',
                  bold: true,
                  fontSize: 11,
                },
              ],
            },
          ],
          columnGap: 10,
        },
        {
          columns: [
            parseInt(cityId) === 1 ?
                {
                  text: [
                    {
                      text: 'BR Registration: PV – 00258881',
                      bold: true,
                      fontSize: 11,
                    },
                  ],
                } : {},
            parseInt(cityId) === 1 ?
                {
                  width: '*',
                  text: [
                    {
                      text: 'MOH Registration: PHSRC/FGP/655',
                      alignment: 'right',
                      bold: true,
                      fontSize: 11,
                    },
                  ],
                } : {}],
        },
        {
          text: parseInt(cityId) === 1
              ? 'BK HEALTH CARE (PVT) LTD, SPRINGVALLEY ROAD, NAULLA, DEMODERA, SRI LANKA. Tel: +94 779569965'
              : 'BK HEALTH CARE (PVT) LTD, NO. 644, GALLE ROAD, MATARA, SRI LANKA. Tel: +94 771733166,+94 412050615',
          bold: true,
          margin: [0, 10, 0, 0],
          fontSize: parseInt(cityId) === 1 ? 10.73 : 10.37,
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0, y1: 5,
              x2: 515, y2: 5,
              lineWidth: 1,
            },
          ],
          margin: [0, 5, 0, 20], // Adjust margins as needed
        },
        {
          table: {
            widths: [150, '*'],
            body: [
              [
                {
                  text: 'Date and Time : ',
                  bold: true,
                  margin: [0, 5, 0, 5],
                },
                {
                  text: format(new Date(createdTime), 'yyyy-MM-dd HH:mm'),
                  margin: [5, 5, 0, 5],
                }],
              [
                {text: 'Patient ID # : ', bold: true, margin: [0, 5, 0, 5]}, {
                text: patient.regNo,
                margin: [5, 5, 0, 5],
              }],
              [
                {
                  text: 'Name of the client : ',
                  bold: true,
                  margin: [0, 5, 0, 5],
                }, {
                text: patient.name,
                margin: [5, 5, 0, 5],
              }],
              [
                {text: 'Age : ', bold: true, margin: [0, 5, 0, 5]},
                {text: patient.age, margin: [5, 5, 0, 5]}],
              [
                {text: 'Sex : ', bold: true, margin: [0, 5, 0, 5]},
                {text: patient.gender, margin: [5, 5, 0, 5]}],
              [
                {text: 'Diagnosis : ', bold: true, margin: [0, 5, 0, 5]},
                {text: diagnosis, margin: [5, 5, 0, 5]}],
              [
                {
                  text: 'Investigations and Management : ',
                  bold: true,
                  margin: [0, 5, 0, 5],
                }, {
                text: history,
                margin: [5, 5, 0, 5],
              }],
              [
                {text: 'Prescription : ', bold: true, margin: [0, 5, 0, 5]}, {
                stack: medicineList.map(medicine => ({
                  text: medicine,
                  margin: [0, 0, 0, 6],  // Adding vertical spacing
                })),
                margin: [5, 5, 0, 5],
              }],
            ],
          },
          layout: 'noBorders',
        },
      ],
    };

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    pdfDocGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    });
  };

  return (
      <div>
        {pdfUrl && <iframe title="hashini.pdf" src={pdfUrl}
                           style={{width: '100%', height: '500px'}}/>}
        <a href={pdfUrl}
           download={`${prescription?.patient?.name}_Prescription.pdf`}
           style={{display: 'block', marginTop: '10px', width: '7rem'}}>
          Download PDF
        </a>
      </div>
  );
};

export default PdfMakerComponent;