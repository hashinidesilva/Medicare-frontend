import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font, Link } from '@react-pdf/renderer';
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  section: {
    margin: 10,
    padding: 10
  },
  value: {
    fontSize: 11,
    marginBottom: 7,
  },
  listItem: {
    fontSize: 13,
    marginBottom: 4
  },
  logo: {
    width: 150,
    height: 70
  },
  bulletPoint: {
    marginRight: 10
  },
  letterHead: {
    fontSize: 11,
    marginBottom: 7,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 13,
    fontWeight: "normal",
    flex: 1,
    display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // wordWrap: 'break-word'
  },
  titleText: {
    width: 120,
    fontSize: 13,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
});

const CustomText = (props) => {
  return (
    <Text style={styles.letterHead}>
      {props.children}
    </Text>
  );
};

const CustomRow = ({title, value}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.titleText}>{title}</Text>
      {/*<Text style={styles.content}>{value?.length > 0 ? value.split('') : value}</Text>*/}
      <Text style={styles.content}>{value}</Text>
    </View>
  );
};

const PrescriptionPDF = ({prescription}) => {
  const {patient, diagnosis, history, medicines, createdTime} = prescription;
  const medicineList = medicines?.map(item => item.medicine.name);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src="/bklogo.jpeg"/>
          <View>
            <Text style={styles.letterHead}>Dr. G.H.J De Silva</Text>
            <Text style={styles.letterHead}>MD (Medicine & Surgery)</Text>
            <Text style={styles.letterHead}>SLMC Reg No: 35436</Text>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <CustomText>BR Registration: PV – 00258881</CustomText>
          <CustomText>MOH Registration: PHSRC/FGP/655</CustomText>
        </View>
        <Text
          style={{
            fontSize: 10.7,
            marginBottom: 7,
            fontWeight: 'bold'
          }}>
          BK HEALTH CARE (PVT) LTD, SPRINGVALLEY ROAD, NAULLA, DEMODERA, SRI LANKA. Tel: +94 779569965
        </Text>
        <View style={{border: 0.5, marginBottom: 30}}/>
        <CustomRow title={"Date and Time :"}
                   value={createdTime ? format(new Date(createdTime), 'yyyy-MM-dd HH:mm') : ""}/>
        <CustomRow title={"Patient ID # :"} value={patient?.nic}/>
        <CustomRow title={"Name of the client :"} value={patient?.name}/>
        <CustomRow title={"Age :"} value={patient?.age}/>
        <CustomRow title={"Sex :"} value={patient?.gender}/>
        <CustomRow title={"Diagnosis :"} value={diagnosis}/>
        <CustomRow title={"Investigations and Management :"} value={history}/>
        <View style={styles.row}>
          <Text style={styles.titleText}>Prescription :</Text>
          <View style={{justifyContent: 'flex-start',}}>
            {medicineList?.map((name, index) => (
              <Text key={index} style={styles.listItem}>{name}</Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PrescriptionPDF;