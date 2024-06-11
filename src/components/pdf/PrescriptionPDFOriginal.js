import { Box, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import LetterHead from "./LetterHead";

const CustomTypography = ({title, value}) => {
  return (
    <Stack direction={"row"} spacing={2}>
      <Typography variant="h7" fontWeight={600}>
        {title} :
      </Typography>
      <Typography variant="h7">
        {value}
      </Typography>
    </Stack>
  );
};
const PrescriptionPDFOriginal = ({prescription}) => {
  const {patient, diagnosis, history, medicines, createdTime} = prescription;
  const medicineList = medicines?.map(item => item.medicine.name);
  return (
    <>
      <LetterHead/>
      {patient && (
        <Stack spacing={3}>
          <CustomTypography title={"Date and Time"} value={format(new Date(createdTime), 'yyyy-MM-dd HH:mm')}/>
          <CustomTypography title={"Patient ID #"} value={patient?.nic}/>
          <CustomTypography title={"Name of the client"} value={patient?.name}/>
          <CustomTypography title={"Age"} value={patient?.age}/>
          <CustomTypography title={"Sex"} value={patient?.gender}/>
          <CustomTypography title={"Diagnosis"} value={diagnosis}/>
          <CustomTypography title={"Investigations and Management"} value={history}/>
          <Stack>
            <Typography variant="h7" fontWeight={600}> Prescription :</Typography>
            <Box sx={{
              width: '100%',
              '& .MuiListItem-root': {
                paddingLeft: 2, // Adjust padding as needed
                '&::before': {
                  content: '"•"', // Using a bullet point as the content
                  paddingRight: '10px', // Space between the bullet and text
                  color: 'black', // Bullet color
                  fontSize: '20px', // Adjust the size of the bullet
                  verticalAlign: 'middle' // Align the bullet vertically with the text
                }
              }
            }}>
              <List>
                {medicineList?.map((name, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={name}/>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default PrescriptionPDFOriginal;