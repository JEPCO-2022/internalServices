import { Card, Grid, InputLabel, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const SubscriptionDetails = () => {
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
              معلومات الاشتراك
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              رقم العقد :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.SubscriptionInfoData?.Contract}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              رقم المرجع :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.SubscriptionInfoData?.FileNo}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              رقم الاشتراك :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.SubscriptionInfoData?.Installation}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              رقم العداد :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.SubscriptionInfoData?.MeterNo}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              ملتزم بالاقساط :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.SubscriptionInfoData?.InstplanCommitmentText}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              حالة العداد :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.SubscriptionInfoData?.MeterStatus}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              نوع الاشتراك :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.SubscriptionInfoData?.RateCatDesc}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              اسم المشترك :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.SubscriptionInfoData?.CustomerName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              رصيد المشترك :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.SubscriptionInfoData?.CustomerBalance}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              المكتب :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.SubscriptionInfoData?.Office}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              نوع العداد :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.SubscriptionInfoData?.MeterType}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
              تاريخ اخر قراءة :
            </InputLabel>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              {customerInfo?.SubscriptionInfoData?.LastRegistersReadDate}
            </Typography>
          </Grid>
          {customerInfo?.SubscriptionInfoData?.LastRegistersRead2.trim()
            .length === 0 && (
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
                أخر قراءة :
              </InputLabel>
              <Typography sx={{ display: "inline", fontWeight: "bold" }}>
                {customerInfo?.SubscriptionInfoData?.LastRegistersRead1}
              </Typography>
            </Grid>
          )}
          {customerInfo?.SubscriptionInfoData?.LastRegistersRead2.trim()
            .length !== 0 && (
            <>
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
                  الطاقة المستجرة :
                </InputLabel>
                <Typography sx={{ display: "inline", fontWeight: "bold" }}>
                  {customerInfo?.SubscriptionInfoData?.LastRegistersRead1}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel sx={{ display: "inline", fontWeight: "bold" }}>
                  الطاقة المصدرة :
                </InputLabel>
                <Typography sx={{ display: "inline", fontWeight: "bold" }}>
                  {customerInfo?.SubscriptionInfoData?.LastRegistersRead2}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Card>
    </>
  );
};

export default SubscriptionDetails;
