import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  CircularProgress,
  TableRow,
  TextField,
  Typography,
  tableCellClasses,
  Snackbar,
  IconButton,
  Box,
} from "@mui/material";
import ExcelJS from "exceljs";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  ErrorCustomerInfo,
  GetSapCustomerInfo,
  SetCustomerInfo,
  basicAuth,
} from "../../Redux/Customer/CustomerAction.js";
import "../../../index.css";
import InstallmentDetails from "./InstallmentDetails";
import SubscriptionDetails from "./SubscriptionDetails";
import VigilantDetails from "./VigilantDetails";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(25, 118, 210)",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#eee",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SubscriptionsInquiry = () => {
  const [showBills, setShowBills] = useState(false);
  const [contractNumber, setContractNumber] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [subscriptionNo, setsubscriptionNo] = useState("");
  const [fildsValue, setFildsValue] = useState("1");
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const customerInfo = useSelector((state) => state.Customer.customerInfo);
  const loadingCustomerInfo = useSelector(
    (state) => state.Customer.loadingCustomerInfo
  );
  const errorGetData = useSelector((state) => state.Customer.errorGetData);

  const handleChangeRadioButton = (event) => {
    setFildsValue(event.target.value);
    if (event.target.value === "1") {
      setMeterNumber("");
      setReferenceNumber("");
      setsubscriptionNo("");
      return false;
    }
    if (event.target.value === "2") {
      setMeterNumber("");
      setContractNumber("");
      setsubscriptionNo("");
      return false;
    }
    if (event.target.value === "3") {
      setContractNumber("");
      setReferenceNumber("");
      setsubscriptionNo("");
      return false;
    }
    if (event.target.value === "4") {
      setMeterNumber("");
      setReferenceNumber("");
      setContractNumber("");
      return false;
    }
  };

  const handleTab = () => {
    const data = {
      languageId: "AR",
      installation: subscriptionNo,
      contract: contractNumber,
      meterNo: meterNumber,
      fileNo: referenceNumber,
      getVigilanceData: "X",
      getDisconnectionData: "X",
      getInstallmentPlanData: "X",
      getBillsData: "X",
    };
    dispatch(GetSapCustomerInfo(data));
  };

  const handleCloseShowBills = () => {
    setShowBills(false);
  };
  const handleOpenShowBills = () => {
    setShowBills(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    dispatch(ErrorCustomerInfo(0));
    dispatch(SetCustomerInfo([]));
    dispatch(basicAuth());
  }, []);

  useEffect(() => {
    if (isFirstTime) {
      if (errorGetData !== 0) {
        setOpen(errorGetData);
      }
    }
    setIsFirstTime(true);
  }, [errorGetData]);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const exportToExcel = (apiData, fileName) => {
    const customHeadings = apiData.reduce((acc, curr) => {
      const _users = acc;
      return [
        ..._users,
        {
          billingKeyDate: curr.BillingKeyDate,
          billAmount: curr.BillAmount,
          consumptionQty: curr.ConsumptionQty,
          BillStatus: curr.BillStatus,
        },
      ];
    }, []);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1", {
      pageSetup: {
        orientation: "landscape",
        fitToPage: true,
        fitToHeight: 5,
        fitToWidth: 7,
        paperSize: 9,
      },
    });
    worksheet.addRow([fileName]);
    worksheet.addRow([
      "تاريخ الفاتورة ",
      "قيمة الفاتورة ",
      "كمية الاستهلاك ",
      " حالة الفاتورة ",
    ]);

    customHeadings.map((e) =>
      worksheet.addRow([
        e.billingKeyDate,
        e.billAmount,
        e.consumptionQty,
        e.BillStatus,
      ])
    );
    worksheet.columns[0].width = 10;
    worksheet.columns[1].width = 20;
    worksheet.columns[2].width = 20;
    worksheet.columns[3].width = 20;

    worksheet.mergeCells("A1:D1");
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { horizontal: "center", vertical: "middle" };
      });
    });
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.xlsx`;
      a.click();
    });
  };
  return (
    <div>
      {/* <Container> */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              p: 3,
              boxShadow: "4",
              backgroundColor: "rgba(145, 158, 171, 0.12);",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <Typography variant="h4" component="h1" paragraph>
                  الاستعلام عن الإشتراكات
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={handleChangeRadioButton}
                    defaultValue={"1"}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label=" رقم العقد "
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="رقم المرجع"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label=" رقم العداد "
                    />
                    <FormControlLabel
                      value="4"
                      control={<Radio />}
                      label=" رقم الإشتراك "
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                {fildsValue === "1" && (
                  <>
                    <TextField
                      onChange={(e) => {
                        const regex = /^[0-9\b]+$/;
                        if (
                          e.target.value === "" ||
                          regex.test(e.target.value)
                        ) {
                          setContractNumber(e.target.value);
                        }
                      }}
                      fullWidth
                      placeholder=" رقم العقد "
                      variant="outlined"
                      value={contractNumber}
                    />
                  </>
                )}
                {fildsValue === "2" && (
                  <TextField
                    inputProps={{
                      maxLength: 13,
                    }}
                    onChange={(e) => {
                      const regex = /^[0-9\b]+$/;
                      if (e.target.value === "" || regex.test(e.target.value)) {
                        setReferenceNumber(e.target.value);
                      }
                    }}
                    fullWidth
                    placeholder="رقم المرجع"
                    variant="outlined"
                    value={referenceNumber}
                  />
                )}
                {fildsValue === "3" && (
                  <TextField
                    inputProps={{
                      maxLength: 18,
                    }}
                    onChange={(e) => {
                      const regex = /^[0-9\b]+$/;
                      if (e.target.value === "" || regex.test(e.target.value)) {
                        setMeterNumber(e.target.value);
                      }
                    }}
                    fullWidth
                    placeholder=" رقم العداد "
                    variant="outlined"
                    value={meterNumber}
                  />
                )}
                {fildsValue === "4" && (
                  <TextField
                    inputProps={{
                      maxLength: 10,
                    }}
                    onChange={(e) => {
                      const regex = /^[0-9\b]+$/;
                      if (e.target.value === "" || regex.test(e.target.value)) {
                        setsubscriptionNo(e.target.value);
                      }
                    }}
                    fullWidth
                    placeholder=" رقم الإشتراك "
                    variant="outlined"
                    value={subscriptionNo}
                  />
                )}
              </Grid>
              <Grid item xs={6} md={10} lg={10}>
                <Button
                  variant="contained"
                  onClick={handleTab}
                  endIcon={
                    loadingCustomerInfo && (
                      <CircularProgress size={20} color="inherit" />
                    )
                  }
                  disabled={loadingCustomerInfo}
                >
                  بحث
                </Button>
              </Grid>
              {Object.keys(customerInfo).length !== 0 && (
                <>
                  {customerInfo?.BillsData?.length !== 0 && (
                    <>
                      <Grid item xs={6} md={2} lg={2}>
                        <Button
                          variant="contained"
                          onClick={handleOpenShowBills}
                        >
                          إظهار الفواتير
                        </Button>
                      </Grid>
                    </>
                  )}
                </>
              )}
            </Grid>
          </Card>
        </Grid>
        {Object.keys(customerInfo).length !== 0 &&
        customerInfo?.BillsData?.length !== 0 ? (
          <>
            <Grid item xs={12} md={12} lg={12}>
              <SubscriptionDetails />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <VigilantDetails />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InstallmentDetails />
            </Grid>
          </>
        ) : (
          <>
            <Grid textAlign="center" item xs={12} md={12} lg={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                  marginTop: "15vh",
                }}
              >
                <Grid item xs={12} md={12} lg={12}>
                  <Typography variant="h5" component="h1" paragraph>
                    لا يوجد بيانات
                  </Typography>
                </Grid>
              </Box>
            </Grid>
          </>
        )}
      </Grid>

      <Dialog
        maxWidth="lg"
        open={showBills}
        onClose={handleCloseShowBills}
        fullWidth={true}
        scroll="paper"
      >
        <DialogTitle style={{ textAlign: "center" }}>الفواتير</DialogTitle>

        <DialogContent>
          <Box textAlign="end" marginBottom={3}>
            <Button
              endIcon={<FileDownloadIcon />}
              variant="outlined"
              onClick={() => {
                exportToExcel(customerInfo?.BillsData, "الفواتير");
              }}
              fullwidth
            >
              تنزيل
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    تاريخ الفاتورة
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    إجمالي قيمة الفاتورة
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    كمية الاستهلاك
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    حالة الفاتورة
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerInfo?.BillsData?.map((bill) => (
                  <StyledTableRow key={bill?.consumptionQty}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {bill?.BillingKeyDate}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {bill?.BillAmount}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {bill?.ConsumptionQty}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {bill?.BillStatus}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShowBills}>إغلاق</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="الرقم المدخل غير صحيح "
        action={action}
      />
      {/* </Container> */}
    </div>
  );
};

export default SubscriptionsInquiry;
