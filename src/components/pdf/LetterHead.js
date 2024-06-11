import { Divider, Stack, Typography } from "@mui/material";

const CustomTypography = (props) => {
  return (
    <Typography variant="h7" fontWeight={600}>
      {props.children}
    </Typography>
  );
};

const Letterhead = () => {
  // return (
  //   <Stack spacing={3} direction={"column"} sx={{mb: 3}}>
  //     <Stack direction={"row"} justifyContent={"space-between"}>
  //       <img src="/bklogo.jpeg" alt="BK Health Care" style={{height: 130, width: 250}}/>
  //       <Stack spacing={2}>
  //         <CustomTypography>Dr. G.H.J De Silva</CustomTypography>
  //         <CustomTypography>MD (Medicine & Surgery</CustomTypography>
  //         <CustomTypography variant="h7">SLMC Reg No: 35436</CustomTypography>
  //       </Stack>
  //     </Stack>
  //     <Stack direction={"row"} justifyContent={"space-between"}>
  //       <CustomTypography>BR Registration: PV – 00258881</CustomTypography>
  //       <CustomTypography>MOH Registration: PHSRC/FGP/655</CustomTypography>
  //     </Stack>
  //     <CustomTypography>
  //       BK HEALTH CARE (PVT) LTD, SPRINGVALLEY ROAD, NAULLA, DEMODERA, SRI LANKA. Tel: +94 779569965
  //     </CustomTypography>
  //     <Divider color={"black"}/>
  //   </Stack>
  // );
  return (
    <div style={{
      // display: 'flex',
      // justifyContent: 'space-between',
      // alignItems: 'center', // Keeps the overall content vertically centered
      padding: '30px',
      // border: '2px solid black',
      marginBottom: '20px',
      backgroundColor: 'white',
    }}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "flex-start"}}>
        <div style={{textAlign: 'left'}}>
          <img src="/bklogo.jpeg" alt="BK Health Care" style={{height: 70, width: 150}}/>
        </div>
        <div style={{
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'flex-start', // Aligns content to the top
          height: '100%' // Ensures it takes full height
        }}>
          <text style={{marginBottom: 10}}>Dr. G.H.J De Silva</text>
          <text style={{marginBottom: 10}}>MD (Medicine & Surgery)</text>
          <text style={{marginBottom: 10}}>SLMC Reg No: 35436</text>
        </div>
      </div>
      {/*<div style={{*/}
      {/*  display: 'flex',*/}
      {/*  flexDirection: 'column',*/}
      {/*  justifyContent: 'center', // Centers the left content vertically*/}
      {/*  height: '100%' // Full height to match the right side*/}
      {/*}}>*/}
      {/*  <img src="/bklogo.jpeg" alt="BK Health Care" style={{height: 130, width: 250}}/>*/}
      {/*  <div>*/}
      {/*    <p>BR Registration: PV – 00258881</p>*/}
      {/*    /!*<p>MOH Registration: PHSRC/FGP/655</p>*!/*/}
      {/*    <p>BK HEALTH CARE (PVT) LTD, SPRINGVALLEY ROAD, NAULLA, DEMODERA, SRI LANKA. Tel: +94 779569965</p>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div style={{*/}
      {/*  textAlign: 'right',*/}
      {/*  display: 'flex',*/}
      {/*  flexDirection: 'column',*/}
      {/*  justifyContent: 'flex-start', // Aligns content to the top*/}
      {/*  height: '100%' // Ensures it takes full height*/}
      {/*}}>*/}
      {/*  <p style={{margin: 0}}>Dr. G.H.J De Silva</p>*/}
      {/*  <p style={{margin: 0}}>MD (Medicine & Surgery)</p>*/}
      {/*  <p style={{margin: 0}}>SLMC Reg No: 35436</p>*/}
      {/*</div>*/}
    </div>
  );
};

export default Letterhead;