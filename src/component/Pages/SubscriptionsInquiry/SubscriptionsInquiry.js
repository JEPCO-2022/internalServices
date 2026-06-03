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
  Alert,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip, InputAdornment } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SendIcon from "@mui/icons-material/Send";
import AccountStatementModal from "../ServicesDialog/ServicesDialog"; // المسار حسب مكان الملف
import ExcelJS from "exceljs";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearCustomerInfo,
  ErrorCustomerInfo,
  ErrorCustomerInfoMessage,
  GetCustomerInfoMobile,
  GetSapCustomerInfo,
  Login,
  RequestCustomerInfo,
  SendMessageFailure,
  SendMessageSuccess,
  SetCustomerInfo,
  IntegrationAuth,
  PrintingAccountStatement,
  GetPrintingAccountStatement,
  ErrorPrintingAccountStatement,
} from "../../Redux/Customer/CustomerAction.js";
import "../../../index.css";
import "./SubscriptionsInquiry.css";
import SessionTimeout from "../ErrorPage/SessionTimeout.js";
import SubscriptionTabs from "./MainTabs";
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
  const [showPayments, setShowPayments] = useState(false);
  const [contractNumber, setContractNumber] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [subscriptionNo, setsubscriptionNo] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [MobileNumberError, setMobileNumberError] = useState("");
  const [error, setError] = useState(false);
  const [fildsValue, setFildsValue] = useState("1");
  const [open, setOpen] = React.useState(false);
  const [openSendMessageDialog, setOpenSendMessageDialog] =
    React.useState(false);
  const [openPrintDialog, setOpenPrintDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Can be 'success' or 'error'
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const customerInfo = useSelector((state) => state.Customer.customerInfo);
  const loadingCustomerInfo = useSelector(
    (state) => state.Customer.loadingCustomerInfo
  );
  const LoadingMessage = useSelector((state) => state.Customer.LoadingMessage);
  const loadingPrintingAccountStatement = useSelector(
    (state) => state.Customer.loadingPrintingAccountStatement
  );
  const MessageErrorResponse = useSelector(
    (state) => state.Customer.MessageErrorResponse
  );
  const errorGetData = useSelector((state) => state.Customer.errorGetData);
  const [fileUrl, setFileUrl] = useState(null);
  const errorPrintingAccountStatement = useSelector(
    (state) => state.Customer.errorPrintingAccountStatement
  );
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedReport, setSelectedReport] = useState(
    "OutstandingBillStatment"
  );
  const [selectedForm, setSelectedForm] = useState("preprintedForm");
  const [selectedSize, setSelectedSize] = useState("PaperSizeA5");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPrintAttempted, setIsPrintAttempted] = useState(false);

  const handlePrint = () => {
    if (!fileUrl) return;
    const printWindow = window.open(fileUrl, "_blank");
    printWindow.addEventListener("load", () => {
      printWindow.print();
    });
  };
  // Helper function to format date
  function formatDateYMD(date) {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  }

  const handleChangeRadioButton = (event) => {
    setFildsValue(event.target.value);
    if (event.target.value === "1") {
      setMeterNumber("");
      setReferenceNumber("");
      setsubscriptionNo("");
      dispatch(ErrorCustomerInfoMessage(""));
      setError(false);
      setErrors({});
      dispatch(ClearCustomerInfo());

      return false;
    }
    if (event.target.value === "2") {
      setMeterNumber("");
      setContractNumber("");
      setsubscriptionNo("");
      dispatch(ErrorCustomerInfoMessage(""));
      setError(false);
      setErrors({});
      dispatch(ClearCustomerInfo());

      return false;
    }
    if (event.target.value === "3") {
      setContractNumber("");
      setReferenceNumber("");
      setsubscriptionNo("");
      dispatch(ErrorCustomerInfoMessage(""));
      setError(false);
      setErrors({});
      dispatch(ClearCustomerInfo());

      return false;
    }
    if (event.target.value === "4") {
      setMeterNumber("");
      setReferenceNumber("");
      setContractNumber("");
      dispatch(ErrorCustomerInfoMessage(""));
      setError(false);
      setErrors({});
      dispatch(ClearCustomerInfo());

      return false;
    }
  };

  const handleTab = () => {
    if (loadingCustomerInfo) return; // Prevent further calls while loading

    if (!handleValidation()) return; // Stop if validation fails

    const data = {
      culture: "AR",
      getVigilanceData: "X",
      getDisconnectionData: "X",
      getInstallmentPlanData: "X",
      getBillsData: "X",
    };

    // أضف الحقل المطلوب فقط
    if (subscriptionNo) {
      data.installation = subscriptionNo;
    } else if (contractNumber) {
      data.contract = contractNumber;
    } else if (meterNumber) {
      data.meterNo = meterNumber;
    } else if (referenceNumber) {
      data.fileNo = referenceNumber;
    }
    dispatch(GetSapCustomerInfo(data));
  };
  const clearSearch = () => {
    dispatch(ErrorCustomerInfo(0));
    dispatch(ClearCustomerInfo());
    setMobileNumber("");
    setReferenceNumber("");
    setMeterNumber("");
    setContractNumber("");
    setsubscriptionNo("");
    setError(false);
    setErrors({});
    setFileUrl(null);
    dispatch(ErrorCustomerInfoMessage(""));
    GetPrintingAccountStatement([]);
  };
  useEffect(() => {
    dispatch(ErrorCustomerInfo(0));
    dispatch(ErrorPrintingAccountStatement(0));
    dispatch(SetCustomerInfo([]));
  }, []);

  const handleCloseShowBills = () => {
    setShowBills(false);
  };
  const handleOpenShowBills = () => {
    setShowBills(true);
  };

  const handleCloseShowPayments = () => {
    setShowPayments(false);
  };
  const handleOpenShowPayments = () => {
    setShowPayments(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    dispatch(ErrorCustomerInfoMessage(""));
  };
  // console.log(open);

  const vigilanceData = customerInfo?.vigilanceData;
  // Condition to check if InstallmentPlanData should be displayed
  const hasVigilance =
    vigilanceData &&
    (vigilanceData.vigilanceTotalAmt > 0 ||
      vigilanceData.vigilanceUnClearedAmt > 0 ||
      vigilanceData.vigilanceClearedAmt > 0);

  const installmentData = customerInfo?.installmentPlanData;

  // Condition to check if InstallmentPlanData should be displayed
  const hasInstallments =
    installmentData &&
    (installmentData.noOfInstallments > 0 ||
      installmentData.NoOfClearedInstallments > 0 ||
      installmentData.noOfUnclearedInstallments > 0);

  useEffect(() => {
    dispatch(ErrorCustomerInfo(0));
    dispatch(SendMessageFailure(0));
    dispatch(SendMessageSuccess([]));
    dispatch(SetCustomerInfo([]));
    dispatch(IntegrationAuth());
    dispatch(RequestCustomerInfo(false));
    dispatch(ErrorCustomerInfoMessage(""));
    GetPrintingAccountStatement([]);
    setFileUrl(null);
  }, []);
  useEffect(() => {
    dispatch(Login());
  }, []);

  useEffect(() => {
    if (MessageErrorResponse !== "") {
      setOpen(true);
    } else if (MessageErrorResponse == "") {
      setOpen(false);
    } else {
      setOpen(false);
    }
  }, [MessageErrorResponse]);

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
  const getData = () => {
    const jordanianPhoneRegex = /^(077|078|079)\d{7}$/;
    const value = MobileNumber;

    if (value.length !== 10 || !/^[0-9]*$/.test(value)) {
      setError(true);
      showSnackbar("الرقم يجب ان يتكون من 10 أرقام", "error");
      return;
    }

    if (!jordanianPhoneRegex.test(value)) {
      setError(true);
      showSnackbar("الرقم يجب ان يبدأ ب 077 او 078 او 079", "error");
      return;
    }

    setError(false);

    const data = {
      LanguageId: "AR",
      BarcodeValue: customerInfo.subscriptionInfoData.accountStatmentBareCode,
      MobileNumber: value,
      DocumnetTypeId: 1,
      FileNumber: customerInfo.subscriptionInfoData.fileNo,
    };

    dispatch(GetCustomerInfoMobile(data))
      .then((response) => {
        // console.log("response", response);
        showSnackbar("تم ارسال الكشف للمشترك بنجاح", "success");
      })
      .catch((error) => {
        console.error("Error:", error);
        showSnackbar("حدث خطأ ما, الرجاء المحاولة مرة اخرى", "error");
      });
  };
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  // Close snackbar when it's dismissed
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const exportToExcel = (apiData, fileName) => {
    const customHeadings = apiData.reduce((acc, curr) => {
      const _users = acc;
      return [
        ..._users,
        {
          billingKeyDate: curr.billingKeyDate,
          billAmount: curr.billAmount,
          consumptionQty: curr.consumptionQty,
          billStatus: curr.billStatus,
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
        e.billStatus,
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
  const exportPaymentsToExcel = (apiData, fileName) => {
    const customHeadings = apiData.reduce((acc, curr) => {
      const _users = acc;
      return [
        ..._users,
        {
          paymentAmount: curr.paymentAmount,
          paymentDate: curr.paymentDate,
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
    worksheet.addRow(["تاريخ الدفعة", "قيمة الدفعة"]);

    customHeadings.map((e) =>
      worksheet.addRow([e.paymentDate, e.paymentAmount])
    );
    worksheet.columns[0].width = 10;
    worksheet.columns[1].width = 20;

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
  const getPlaceholder = (value) => {
    switch (value) {
      case "1":
        return "رقم العقد";
      case "2":
        return "رقم المرجع";
      case "3":
        return "رقم العداد";
      case "4":
        return "رقم الإشتراك";
      default:
        return "";
    }
  };
  const formatInstallation = (installation) => {
    if (!installation) return "";
    const str = installation.toString();
    if (str.length === 8) {
      return "00" + str; // 👈 أضف صفرين بالبداية
    }
    return str; // 👈 إذا 10 يظل زي ما هو
  };
  const getMaxLength = (value) => {
    switch (value) {
      case "2":
        return 13;
      case "3":
        return 18;
      case "4":
        return 10;
      default:
        return undefined;
    }
  };
  const getValue = (value) => {
    switch (value) {
      case "1":
        return contractNumber;
      case "2":
        return referenceNumber;
      case "3":
        return meterNumber;
      case "4":
        return subscriptionNo;
      default:
        return "";
    }
  };
  const getErrorKey = (value) => {
    switch (value) {
      case "1":
        return "contractNumber";
      case "2":
        return "referenceNumber";
      case "3":
        return "meterNumber";
      case "4":
        return "subscriptionNo";
      default:
        return "";
    }
  };

  const handleValidation = () => {
    let newErrors = {};

    // Check for the required field and length validation
    switch (fildsValue) {
      case "1":
        if (!contractNumber) {
          newErrors.contractNumber = "رقم العقد مطلوب";
        } else if (contractNumber.length !== 10) {
          newErrors.contractNumber = "رقم العقد يجب أن يتكون من 10 أرقام";
        }
        break;
      case "2":
        if (!referenceNumber) {
          newErrors.referenceNumber = "رقم المرجع مطلوب";
        } else if (referenceNumber.length !== 13) {
          newErrors.referenceNumber = "رقم المرجع يجب أن يتكون من 13 رقم";
        }
        break;
      case "3":
        if (!meterNumber) {
          newErrors.meterNumber = "رقم العداد مطلوب";
        } else if (meterNumber.length < 4 || meterNumber.length > 18) {
          newErrors.meterNumber =
            "رقم العداد يجب أن يتكون من 4 أرقام أو أكثر وألا يتجاوز 18 رقم";
        }
        break;
      case "4":
        if (!subscriptionNo) {
          newErrors.subscriptionNo = "رقم الاشتراك مطلوب";
        } else if (subscriptionNo.length !== 10) {
          newErrors.subscriptionNo = "رقم الاشتراك يجب أن يتكون من 10 أرقام";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleInputChange = (e, value) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      switch (value) {
        case "1":
          setContractNumber(e.target.value);
          setErrors((prev) => ({ ...prev, contractNumber: "" })); // Clear error on input
          break;
        case "2":
          setReferenceNumber(e.target.value);
          setErrors((prev) => ({ ...prev, referenceNumber: "" }));
          break;
        case "3":
          setMeterNumber(e.target.value);
          setErrors((prev) => ({ ...prev, meterNumber: "" }));
          break;
        case "4":
          setsubscriptionNo(e.target.value);
          setErrors((prev) => ({ ...prev, subscriptionNo: "" }));
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevents unwanted form submission
        if (!loadingCustomerInfo) {
          handleTab();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [loadingCustomerInfo, handleTab]);
  return (
    <>
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
                <Typography
                  align="center"
                  paragraph
                  sx={{
                    fontSize: 35,
                    fontWeight: 900, // 👈 strongest (extra bold)
                    color: "rgb(0, 61, 118)",
                  }}
                >
                  خدمة الاستعلام عن الاشتراكات - دائرة الجباية
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
                      control={
                        <Radio
                          sx={{
                            color: "#003d76",
                            "&.Mui-checked": {
                              color: "#003d76",
                            },
                          }}
                        />
                      }
                      label=" رقم العقد "
                    />
                    <FormControlLabel
                      value="2"
                      control={
                        <Radio
                          sx={{
                            color: "#003d76",
                            "&.Mui-checked": {
                              color: "#003d76",
                            },
                          }}
                        />
                      }
                      label="رقم المرجع"
                    />
                    <FormControlLabel
                      value="3"
                      control={
                        <Radio
                          sx={{
                            color: "#003d76",
                            "&.Mui-checked": {
                              color: "#003d76",
                            },
                          }}
                        />
                      }
                      label=" رقم العداد "
                    />
                    <FormControlLabel
                      value="4"
                      control={
                        <Radio
                          sx={{
                            color: "#003d76",
                            "&.Mui-checked": {
                              color: "#003d76",
                            },
                          }}
                        />
                      }
                      label=" رقم الإشتراك "
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {fildsValue && (
                  <TextField
                    className="search-field"
                    disabled={
                      loadingCustomerInfo ||
                      (customerInfo &&
                        customerInfo.billsData &&
                        customerInfo.billsData.length > 0)
                    } // only disable while a request is in flight
                    dir="rtl"
                    fullWidth
                    variant="outlined"
                    placeholder={getPlaceholder(fildsValue)}
                    inputProps={{ maxLength: getMaxLength(fildsValue) || 10 }} // Fallback value
                    value={getValue(fildsValue)}
                    onChange={(e) => handleInputChange(e, fildsValue)}
                    error={Boolean(errors[getErrorKey(fildsValue)])} // Display error if exists
                    helperText={errors[getErrorKey(fildsValue)]} // Show error message
                    //                     InputProps={{
                    //   endAdornment: (loadingCustomerInfo || (customerInfo?.billsData?.length > 0)) && (
                    //     <InputAdornment position="end">
                    //       <Tooltip title={loadingCustomerInfo ? "جاري البحث..." : "تم تعطيل الحقل بعد البحث"}>
                    //         <InfoIcon color="action" style={{ cursor: "pointer" }} />
                    //       </Tooltip>
                    //     </InputAdornment>
                    //   ),
                    // }}
                  />
                )}
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleTab}
                  endIcon={
                    loadingCustomerInfo ? (
                      <CircularProgress
                        style={{ margin: "5px" }}
                        size={25}
                        color="primary"
                      />
                    ) : (
                      <SearchIcon style={{ margin: "5px" }} />
                    )
                  }
                  disabled={loadingCustomerInfo}
                >
                  بحث
                </Button>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                {customerInfo &&
                customerInfo.billsData &&
                customerInfo.billsData.length > 0 ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={clearSearch}
                    endIcon={<CloseIcon style={{ margin: "5px" }} />} // 👈 icon here
                  >
                    إلغاء البحث
                  </Button>
                ) : null}
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid spacing={2} container item xs={12} md={12} lg={12}>
          <AccountStatementModal
            MobileNumber={MobileNumber}
            setMobileNumber={setMobileNumber}
            error={error}
            getData={getData}
            LoadingMessage={LoadingMessage}
            selectedReport={selectedReport}
            setSelectedReport={(val) => setSelectedReport(val)}
            selectedForm={selectedForm}
            setSelectedForm={(val) => setSelectedForm(val)}
            selectedSize={selectedSize}
            setSelectedSize={(val) => setSelectedSize(val)}
            selectedDate={selectedDate}
            setSelectedDate={(val) => setSelectedDate(val)}
            handlePrintAccountStatement={async (finalDate) => {
              const payload = {
                installation: formatInstallation(
                  customerInfo?.subscriptionInfoData?.installation
                ),
                culture: "AR",
                ...(selectedReport === "OutstandingBillStatment" && {
                  OutstandingBillStatment: "X",
                }),
                ...(selectedReport === "IssuedPayedStatment" && {
                  IssuedPayedStatment: "X",
                }),
                ...(selectedReport === "ReconnectionfeesStatment" && {
                  ReconnectionfeesStatment: "X",
                }),
                ...(selectedReport === "IssuedPayedStatment"
                  ? { PaperSizeZebra: "X" }
                  : selectedSize === "PaperSizeZebra"
                  ? { PaperSizeZebra: "X" }
                  : { PaperSizeA5: "X" }),
                ...(selectedForm === "preprintedForm" && {
                  PreprintedForm: "X",
                }),
                ...(selectedForm === "fullprintedForm" && {
                  FullprintedForm: "X",
                }),
                ...(selectedReport === "IssuedPayedStatment" && {
                  FrSchDate: finalDate
                    ? formatDateYMD(finalDate)
                    : "1900-01-01", // fallback
                }),
              };

              // clear old preview
              setFileUrl((prev) => {
                try {
                  if (prev) URL.revokeObjectURL(prev);
                } catch (e) {}
                return null;
              });

              const pdfBlob = await dispatch(
                PrintingAccountStatement(payload)
              );

              if (pdfBlob) {
                // ✅ لو في ملف PDF
                setFileUrl(URL.createObjectURL(pdfBlob));
                setOpenPreview(true); // 👈 يفتح المودال فوراً
              } else {
                // ✅ إما رجع فاضي أو Error
                showSnackbar(
                  "لا يوجد بيانات حسب محددات البحث المدخلة",
                  "error"
                );
              }
            }}
          />

          {customerInfo &&
            customerInfo.billsData &&
            customerInfo.billsData.length > 0 && (
              <SubscriptionTabs
                customerInfo={customerInfo}
                hasVigilance={hasVigilance}
                hasInstallments={hasInstallments}
              />
            )}
          {/* {customerInfo &&
          customerInfo.billsData &&
          customerInfo.billsData.length > 0 ? (
            <>
              <Grid sx={{ mt: 3 }} item xs={12} md={12} lg={12}>
                <Typography
                  sx={{
                    fontSize: 36,
                    fontWeight: 900,
                    color: "rgb(0, 61, 118)",
                  }}
                  paragraph
                >
                  نتائج البحث
                  <IconButton aria-label="delete" size="large" disabled>
                    <SourceIcon
                      sx={{ color: "rgb(0, 61, 118)" }}
                      fontSize="inherit"
                    />
                  </IconButton>
                </Typography>
                <Divider sx={{ borderBottomWidth: 2, mb: 2 }} />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <div className="animated-card">
                  <SubscriptionDetails />
                </div>
              </Grid>
              {hasVigilance && (
                <Grid item xs={12} md={6} lg={6}>
                  <div className="animated-card">
                    <VigilantDetails />
                  </div>
                </Grid>
              )}
              {hasInstallments && (
                <Grid item xs={12} md={6} lg={6}>
                  <div className="animated-card">
                    <InstallmentDetails />
                  </div>
                </Grid>
              )}
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
          )} */}
        </Grid>
        {/* <Grid item xs={12} md={12} lg={12}>
              {/* <Card
                sx={{
                  p: 4,
                  boxShadow: 4,
                  mt: 3,
                  backgroundColor: "rgba(145, 158, 171, 0.12)",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: "rgb(0, 61, 118)",
                      }}
                      paragraph
                    >
                      خدمة ارسال كشف الحساب
                         <IconButton aria-label="delete" size="large" disabled>
                        <SendIcon
                          sx={{ color: "rgb(0, 61, 118)" }}
                          fontSize="inherit"
                        />
                      </IconButton>
                    </Typography>
                    <Divider sx={{ borderBottomWidth: 2, mb: 2 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      placeholder="ادخل رقم هاتف المشترك"
                      value={MobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      inputProps={{ maxLength: 10 }}
                      error={error}
                      helperText={
                        error
                          ? "الرقم يجب أن يبدأ بـ 079 أو 078 أو 077 ويكون من 10 أرقام"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                            sx={{
                        backgroundColor: "#003d76",
                        fontSize: "larger",
                        fontWeight: 700,
                        "&:hover": {
                          backgroundColor: "#003d76",
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                          transform: "scale(1.02)",
                        },
                      }}
                      fullWidth
                      variant="contained"
                      onClick={getData}
                      disabled={LoadingMessage}
                      endIcon={
                        LoadingMessage && (
                          <CircularProgress size={20} color="inherit" />
                        )
                      }
                    >
                      ارسال كشف حساب للمشترك
                    </Button>
                  </Grid>
                </Grid>
              </Card> */}
        {/* </Grid>  */}

        {/* <Grid container item xs={12} md={12} lg={6}>
              <Card
                sx={{
                  p: 4,
                  boxShadow: 4,
                  mt: 3,
                  backgroundColor: "rgba(145, 158, 171, 0.12)",
                }}
              >
                <Grid container spacing={3} xs={12} md={12} lg={12}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Typography
                      sx={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: "rgb(0, 61, 118)",
                      }}
                      paragraph
                    >
                      خدمة طباعة كشف الحساب
                      <IconButton aria-label="delete" size="large" disabled>
                        <PrintIcon
                          sx={{ color: "rgb(0, 61, 118)" }}
                          fontSize="inherit"
                        />
                      </IconButton>
                    </Typography>
                    <Divider sx={{ borderBottomWidth: 2, mb: 2 }} />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl component="fieldset" fullWidth>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: 600,
                          color: "rgb(0, 61, 118)",
                          mb: 1,
                        }}
                      >
                        نوع الكشف
                      </Typography>
                      <RadioGroup
                        value={selectedReport}
                        onChange={(e) => setSelectedReport(e.target.value)}
                      >
                        <FormControlLabel
                          value="OutstandingBillStatment"
                          control={<Radio />}
                          label="كشف حساب الفواتير"
                        />
                        <FormControlLabel
                          value="IssuedPayedStatment"
                          control={<Radio />}
                          label="كشف مسدد وغير مسدد"
                        />
                        <FormControlLabel
                          value="ReconnectionfeesStatment"
                          control={<Radio />}
                          label="كشف إعادة التيار / الرسوم"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl component="fieldset" fullWidth>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: 600,
                          color: "rgb(0, 61, 118)",
                          mb: 1,
                        }}
                      >
                        حجم الكشف
                      </Typography>
                      <RadioGroup
                        row
                        value={
                          selectedReport === "IssuedPayedStatment"
                            ? "PaperSizeZebra"
                            : selectedSize
                        }
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        <FormControlLabel
                          value="PaperSizeZebra"
                          control={<Radio />}
                          label="Zebra"
                          checked={
                            selectedReport === "IssuedPayedStatment" ||
                            selectedSize === "PaperSizeZebra"
                          }
                          disabled={selectedReport === "IssuedPayedStatment"}
                        />
                        <FormControlLabel
                          value="PaperSizeA5"
                          control={<Radio />}
                          label="A5"
                          disabled={selectedReport === "IssuedPayedStatment"}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl component="fieldset" fullWidth>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: 600,
                          color: "rgb(0, 61, 118)",
                          mb: 1,
                        }}
                      >
                        نوع النموذج
                      </Typography>
                      <RadioGroup
                        value={selectedForm}
                        onChange={(e) => setSelectedForm(e.target.value)}
                      >
                        <FormControlLabel
                          value="preprintedForm"
                          control={<Radio />}
                          label="كشف معد مسبقا"
                        />
                        <FormControlLabel
                          value="fullprintedForm"
                          control={<Radio />}
                          label="نموذج فارغ"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {selectedReport === "IssuedPayedStatment" && (
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Typography
                          sx={{
                            fontSize: 20,
                            fontWeight: 600,
                            color: "rgb(0, 61, 118)",
                            mb: 1,
                          }}
                        >
                          اختر التاريخ
                        </Typography>
                        <DatePicker
                          label="من تاريخ"
                          value={selectedDate}
                          onChange={(newValue) => setSelectedDate(newValue)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              InputProps: { dir: "rtl" }, // 👈 يخلي الإدخال RTL
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  )}
                  {fileUrl && (
                    <Button
                      style={{
                        fontWeight: 900,
                        fontSize: "larger",
                        marginTop: "15px",
                        textDecoration: "underline",
                        transition: "all 0.3s ease-in-out", // 👈 smooth animation
                      }}
                      onClick={() => setOpenPreview(true)}
                      sx={{
                        "&:hover": {
                          transform: "scale(1.05)", // 👈 يكبر شوي
                          color: "#003d76", // 👈 يغير لون
                        },
                      }}
                    >
                      إظهار الكشف
                    </Button>
                  )}

                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: "#003d76",
                        fontSize: "larger",
                        fontWeight: 700,
                        "&:hover": {
                          backgroundColor: "#003d76",
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                          transform: "scale(1.02)",
                        },
                      }}
                      onClick={async () => {
                        const payload = {
                          installation: formatInstallation(
                            customerInfo?.subscriptionInfoData?.installation
                          ),

                          ...(selectedReport === "OutstandingBillStatment" && {
                            OutstandingBillStatment: "X",
                          }),
                          ...(selectedReport === "IssuedPayedStatment" && {
                            IssuedPayedStatment: "X",
                          }),
                          ...(selectedReport === "ReconnectionfeesStatment" && {
                            ReconnectionfeesStatment: "X",
                          }),

                          ...(selectedSize === "PaperSizeZebra" && {
                            PaperSizeZebra: "X",
                          }),
                          ...(selectedSize === "PaperSizeA5" && {
                            PaperSizeA5: "X",
                          }),

                          ...(selectedForm === "preprintedForm" && {
                            PreprintedForm: "X",
                          }),
                          ...(selectedForm === "fullprintedForm" && {
                            FullprintedForm: "X",
                          }),

                          ...(selectedReport === "IssuedPayedStatment" &&
                            selectedDate && {
                              FrSchDate: selectedDate
                                .toISOString()
                                .split("T")[0],
                            }),
                        };

                        console.log("Dispatch payload:", payload);

                        // Clear any previous preview URL before requesting a new file
                        setFileUrl((prev) => {
                          try {
                            if (prev) URL.revokeObjectURL(prev);
                          } catch (e) {}
                          return null;
                        });

                        // dispatch the printing request and rely on the component effect
                        // to open the preview or show an error depending on the response.
                        await dispatch(PrintingAccountStatement(payload));
                        setIsPrintAttempted(true);
                      }}
                      disabled={loadingPrintingAccountStatement}
                      endIcon={
                        loadingPrintingAccountStatement ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <PrintIcon />
                        )
                      }
                    >
                      طلب كشف حساب
                    </Button>
                  </Grid>
                </Grid>
              </Card> */}
        {/* </Grid> */}
        {/* </Grid>
        ) : null} */}
      </Grid>

      <Dialog
        maxWidth="lg"
        open={showBills}
        onClose={handleCloseShowBills}
        fullWidth={true}
        scroll="paper"
      >
        <DialogTitle style={{ textAlign: "center" }}>الفواتير</DialogTitle>
        {customerInfo?.billsData?.length > 0 ? (
          <DialogContent>
            <Box textAlign="end" marginBottom={3}>
              <Button
                endIcon={<FileDownloadIcon />}
                variant="outlined"
                onClick={() => {
                  exportToExcel(customerInfo?.billsData, "الفواتير");
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
                      إجمالي قيمة الفاتورة (د.أ)
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      كمية الاستهلاك (ك.و.س)
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      حالة الفاتورة
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customerInfo?.billsData?.length > 0 ? (
                    customerInfo.billsData.map((bill) => (
                      <StyledTableRow key={bill?.consumptionQty}>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {bill?.billingKeyDate}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {bill?.billAmount}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {bill?.consumptionQty}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          <Chip
                            color={
                              bill?.billStatus === "مسددة" ? "success" : "error"
                            }
                            label={bill?.billStatus}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <StyledTableRow>
                      <StyledTableCell colSpan={4} align="center">
                        لا يوجد
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            لا يوجد فواتير
          </Box>
        )}
        <DialogActions>
          <Button onClick={handleCloseShowBills}>إغلاق</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="lg"
        open={showPayments}
        onClose={handleCloseShowPayments}
        fullWidth={true}
        scroll="paper"
      >
        <DialogTitle style={{ textAlign: "center" }}>الدفعات</DialogTitle>
        {customerInfo?.paymentData?.length > 0 ? (
          <DialogContent>
            <Box textAlign="end" marginBottom={3}>
              <Button
                endIcon={<FileDownloadIcon />}
                variant="outlined"
                onClick={() => {
                  exportPaymentsToExcel(
                    customerInfo?.paymentData,
                    "سجل دفعات المشترك "
                  );
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
                      تاريخ الدفعة{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      إجمالي قيمة الدفعة (د.أ)
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customerInfo?.paymentData?.map((bill) => (
                    <StyledTableRow>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {bill?.paymentDate}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {bill?.paymentAmount}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            لا يوجد دفعات
          </Box>
        )}
        <DialogActions>
          <Button onClick={handleCloseShowPayments}>إغلاق</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={MessageErrorResponse}
        action={action}
      />
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>كشف الحساب</DialogTitle>
        <DialogContent>
          {fileUrl ? (
            <iframe
              src={fileUrl}
              style={{ width: "100%", height: "600px", border: "none" }}
              title="Preview"
            />
          ) : (
            <p>لا يوجد معلومات للعرض</p>
          )}
          <div style={{ marginTop: "1rem", textAlign: "left", margin: 1 }}>
            <Button
              sx={{ margin: 1 }}
              onClick={handlePrint}
              variant="contained"
              color="primary"
            >
              الانتقال الى صفحة الطباعة
            </Button>
            <Button
              onClick={() => {
                // Close preview and revoke the object URL if present
                setOpenPreview(false);
                setFileUrl((prev) => {
                  try {
                    if (prev) URL.revokeObjectURL(prev);
                  } catch (e) {}
                  return null;
                });
              }}
              variant="outlined"
              style={{ marginLeft: 8 }}
            >
              اغلاق
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openSendMessageDialog}
        onClose={() => setOpenSendMessageDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "rgb(0, 61, 118)" }}>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 900,
              color: "rgb(0, 61, 118)",
            }}
            paragraph
          >
            خدمة ارسال كشف الحساب
            <IconButton aria-label="send" size="large" disabled>
              <SendIcon sx={{ color: "rgb(0, 61, 118)" }} fontSize="inherit" />
            </IconButton>
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="ادخل رقم هاتف المشترك"
                value={MobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                inputProps={{ maxLength: 10 }}
                error={error}
                helperText={
                  error
                    ? "الرقم يجب أن يبدأ بـ 079 أو 078 أو 077 ويكون من 10 أرقام"
                    : ""
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenSendMessageDialog(false)}
          >
            إغلاق
          </Button>
          <Grid item xs={12}>
            <Button
              sx={{
                backgroundColor: "#003d76",
                margin: 1,
                // fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#003d76",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                  transform: "scale(1.02)",
                },
              }}
              fullWidth
              variant="contained"
              onClick={getData}
              disabled={LoadingMessage}
              endIcon={
                LoadingMessage && <CircularProgress size={20} color="inherit" />
              }
            >
              ارسال كشف حساب للمشترك
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      <SessionTimeout />
    </>
  );
};

export default SubscriptionsInquiry;
