import { Card, Grid, InputLabel, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const VigilantDetails = () => {
  const customerInfo = useSelector((state) => state.Customer.customerInfo);

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 4,
        boxShadow: "4",
        marginTop: 3,
        backgroundColor: "rgba(145, 158, 171, 0.12);",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
             sx={{
                fontSize: 30,
                fontWeight: 700, // 👈 strongest (extra bold)
                color: "rgb(0, 61, 118)",
              }}
          >
            معلومات العبث
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
            مبلغ إجمالي العبث :
          </InputLabel>
          <Typography sx={{ display: "inline", fontWeight: "bold" }}>
            {customerInfo?.vigilanceData?.vigilanceTotalAmt}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
            مبلغ العبث المطلوب :
          </InputLabel>
          <Typography sx={{ display: "inline", fontWeight: "bold" }}>
            {customerInfo?.vigilanceData?.vigilanceUnClearedAmt}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
            مبلغ العبث المدفوع :
          </InputLabel>
          <Typography sx={{ display: "inline", fontWeight: "bold" }}>
            {customerInfo?.vigilanceData?.vigilanceClearedAmt}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
            عدد معاملات العبث المفتوحة :
          </InputLabel>
          <Typography sx={{ display: "inline", fontWeight: "bold" }}>
            {customerInfo?.vigilanceData?.caseOpen}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
            عدد معاملات العبث المغلقة :
          </InputLabel>
          <Typography sx={{ display: "inline", fontWeight: "bold" }}>
            {customerInfo?.vigilanceData?.caseClos}
          </Typography>
        </Grid>
        {/* <Grid item xs={12} md={12} lg={12}>
          <InputLabel
            sx={{ display: "inline", fontWeight: "bold", color: "transparent" }}
          >
            .
          </InputLabel>
          <Typography
            sx={{ display: "inline", fontWeight: "bold", color: "transparent" }}
          >
            .
          </Typography>
        </Grid> */}
      </Grid>
    </Card>
  );
};

export default VigilantDetails;
