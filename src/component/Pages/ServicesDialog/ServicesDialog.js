import React, { useState } from "react";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  IconButton,
  TextField,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tabs,
  Tab,
  FormControl,
  Checkbox,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useSelector } from "react-redux";

export default function AccountStatementModal({
  MobileNumber,
  setMobileNumber,
  error,
  getData,
  LoadingMessage,
  selectedReport,
  setSelectedReport,
  selectedForm,
  setSelectedForm,
  selectedSize,
  setSelectedSize,
  selectedDate,
  setSelectedDate,
  handlePrintAccountStatement,
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [useDate, setUseDate] = useState(false);

  const customerInfo = useSelector((state) => state.Customer.customerInfo);
  const loadingPrintingAccountStatement = useSelector(
    (state) => state.Customer.loadingPrintingAccountStatement
  );

  const onToggleUseDate = (checked) => {
    setUseDate(checked);
    if (checked) {
      // 👈 إذا فعل checkbox، خلي الافتراضي اليوم
      setSelectedDate(new Date());
    } else {
      // 👈 إذا لغاه، فضي التاريخ
      setSelectedDate(null);
    }
  };

  function formatDateYMD(date) {
    if (!date) return null;
    const d = new Date(date); // 👈 يحاول يحوله Date حتى لو كان string
    if (isNaN(d.getTime())) return null; // لو مش صالح
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  }
  const onPrint = () => {
    let finalDateStr = "1900-01-01"; // default

    if (useDate) {
      const d = selectedDate ? new Date(selectedDate) : new Date(); // 👈 fallback اليوم
      if (!isNaN(d.getTime())) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        finalDateStr = `${y}-${m}-${dd}`;
      }
    }

    handlePrintAccountStatement(finalDateStr);
  };

  return (
    <>
      {customerInfo &&
        customerInfo.billsData &&
        customerInfo.billsData.length > 0 && (
          <Grid container sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="text"
              sx={{
                size: "large",
                color: "rgb(0, 61, 118)",
                fontSize: "larger",
                fontWeight: 700,
                textDecoration: "underline",
              }}
              onClick={() => setOpen(true)}
            >
              الخدمات المتاحة
            </Button>
          </Grid>
        )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "rgb(0, 61, 118)" }}>
          خدمات كشف الحساب
        </DialogTitle>

        <DialogContent dividers>
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            centered
            sx={{ mb: 3 }}
          >
            <Tab label="إرسال كشف الحساب" />
            <Tab label="طباعة كشف الحساب" />
          </Tabs>

          {tab === 0 && (
            <Card
              sx={{
                p: 4,
                boxShadow: 4,
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
                    <IconButton aria-label="send" size="large" disabled>
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
            </Card>
          )}

          {tab === 1 && (
            <Card
              sx={{
                p: 4,
                boxShadow: 4,
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
                    خدمة طباعة كشف الحساب
                  </Typography>
                  <Divider sx={{ borderBottomWidth: 2, mb: 2 }} />
                </Grid>

                {/* نوع الكشف */}
                <Grid item xs={12}>
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
                </Grid>

                {/* حجم الكشف */}
                <Grid item xs={12}>
                  <FormControl component="fieldset" fullWidth>
                    <Typography sx={{ fontSize: 20, fontWeight: 600, mb: 1 }}>
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
                        disabled={selectedReport === "IssuedPayedStatment"} // 👈 هيك ممنوع تغييره
                        value="PaperSizeZebra"
                        control={<Radio />}
                        label="Zebra"
                      />
                      <FormControlLabel
                        disabled={selectedReport === "IssuedPayedStatment"} // 👈 برضو يتعطل لما يكون IssuedPayedStatment
                        value="PaperSizeA5"
                        control={<Radio />}
                        label="A5"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {/* نوع النموذج */}
                <Grid item xs={12}>
                  <FormControl component="fieldset" fullWidth>
                    <Typography sx={{ fontSize: 20, fontWeight: 600, mb: 1 }}>
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

                {/* التاريخ (عند كشف مسدد/غير مسدد) */}
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

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={useDate}
                            onChange={(e) => onToggleUseDate(e.target.checked)}
                          />
                        }
                        label="استخدام التاريخ"
                      />

                      <DatePicker
                        label="من تاريخ"
                        value={selectedDate /* يجب أن تكون Date | null */}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        disabled={!useDate}
                        sx={{
                          visibility: useDate ? "visible" : "hidden",
                          mt: 2,
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            InputProps: { dir: "rtl" },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                )}

                {/* زر الطباعة */}
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
                    onClick={onPrint}
                    disabled={loadingPrintingAccountStatement}
                    endIcon={
                      loadingPrintingAccountStatement && (
                        <CircularProgress size={20} color="inherit" />
                      )
                    }
                  >
                    طباعة كشف الحساب
                  </Button>
                </Grid>
              </Grid>
            </Card>
          )}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
