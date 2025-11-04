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
            <Typography
            
               sx={{
                fontSize: 30,
                fontWeight: 700, // 👈 strongest (extra bold)
                color: "rgb(0, 61, 118)",
              }}
              paragraph
            >
              معلومات الاقساط
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              عدد خطط التقسيط :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.installmentPlanData?.NoOfInstallmentPlans}
            </Typography>
          </Grid>{" "}
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              المبلغ الإجمالي للأقساط :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.installmentPlanData?.totalAmount}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              عدد خطط التقسيط المفتوحة :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.installmentPlanData?.NoOfOpenInstallmentPlans}
            </Typography>
          </Grid>{" "}
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              عدد خطط التقسيط المغلقة :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.installmentPlanData?.NoOfClosedInstallmentPlans}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              عدد الاقساط الكلية :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.installmentPlanData?.noOfInstallments}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              عدد الاقساط المدفوعة :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.installmentPlanData?.noOfClearedInstallments}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              المبلغ المدفوع :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.installmentPlanData?.clearedAmount}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              عدد الاقساط المتبقية :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.installmentPlanData?.noOfUnclearedInstallments}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              المبلغ المتبقي :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.installmentPlanData?.unclearedAmount}
            </Typography>

            {/* "NoOfInstallmentPlans": 0,
            "NoOfOpenInstallmentPlans": 0,
            "NoOfClosedInstallmentPlans": 0 */}
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default InstallmentDetails;
