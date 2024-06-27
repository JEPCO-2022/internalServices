import { Card, Grid, InputLabel, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const InstallmentDetails = () => {
  const customerInfo = useSelector((state) => state.Customer.customerInfo);
  return (
    <>
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
            <Typography variant="h4" component="h1" paragraph color="#2065D1">
              معلومات الاقساط
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              عدد الاقساط الكلية :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.InstallmentPlanData?.NoOfInstallments}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              مبلغ إجمالي للأقساط :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.InstallmentPlanData?.TotalAmount}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              عدد الاقساط المدفوعة :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.InstallmentPlanData?.NoOfClearedInstallments}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              المبلغ المدفوع :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.InstallmentPlanData?.ClearedAmount}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              عدد الاقساط المتبقية :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.InstallmentPlanData?.NoOfUnclearedInstallments}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              المبلغ المتبقي :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.InstallmentPlanData?.UnclearedAmount}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default InstallmentDetails;
