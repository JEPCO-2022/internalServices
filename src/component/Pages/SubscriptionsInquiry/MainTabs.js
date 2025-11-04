import {
  Tabs,
  Tab,
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { exportTableToExcel } from "../export/exportExcel";
import React, { useState } from "react";
import SubscriptionDetails from "./SubscriptionDetails";
import VigilantDetails from "./VigilantDetails";
import InstallmentDetails from "./InstallmentDetails";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function SubscriptionTabs({
  customerInfo,
  hasVigilance,
  hasInstallments
}) {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab
          sx={{ fontSize: "larger", fontWeight: "bold" }}
          disableRipple
          label="📊 نتائج البحث"
        />
        <Tab
          sx={{ fontSize: "larger", fontWeight: "bold" }}
          disableRipple
          label="📑 الفواتير"
        />
        <Tab
          sx={{ fontSize: "larger", fontWeight: "bold" }}
          disableRipple
          label="💰 الدفعات"
        />
      </Tabs>

      {/* الفواتير */}
      <TabPanel value={tabValue} index={1}>
        {customerInfo?.billsData?.length > 0 ? (
          <TableContainer component={Paper}>
            <Box textAlign="end" marginBottom={2}>
              <Button
                startIcon={<FileDownloadIcon />}
                variant="outlined"
                onClick={() => {
                  const headers = [
                    "تاريخ الفاتورة",
                    "قيمة الفاتورة",
                    "كمية الاستهلاك",
                    "حالة الفاتورة",
                  ];
                  const rows = customerInfo?.billsData.map((bill) => [
                    bill.billingKeyDate,
                    bill.billAmount,
                    bill.consumptionQty,
                    bill.billStatus,
                  ]);
                  exportTableToExcel(rows, "الفواتير", headers);
                }}
              >
                تصدير الفواتير
              </Button>
            </Box>
            <Table>
              <TableHead
                sx={{ backgroundColor: "rgb(0, 61, 118)", color: "#ffffff" }}
              >
                <TableRow>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold" }}
                    align="center"
                  >
                    تاريخ الفاتورة
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold" }}
                    align="center"
                  >
                    قيمة الفاتورة (د.أ)
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold" }}
                    align="center"
                  >
                    كمية الاستهلاك (ك.و.س)
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold" }}
                    align="center"
                  >
                    حالة الفاتورة
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerInfo.billsData.map((bill, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{bill.billingKeyDate}</TableCell>
                    <TableCell align="center">{bill.billAmount}</TableCell>
                    <TableCell align="center">{bill.consumptionQty}</TableCell>
                    <TableCell align="center">
                      <Chip
                        color={
                          bill.billStatus === "مسددة" ? "success" : "error"
                        }
                        label={bill.billStatus}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography align="center">لا يوجد فواتير</Typography>
        )}
      </TabPanel>

      {/* الدفعات */}
      <TabPanel value={tabValue} index={2}>
        {customerInfo?.paymentData?.length > 0 ? (
          <TableContainer component={Paper}>
            <Box textAlign="end" marginBottom={2}>
              <Button
                startIcon={<FileDownloadIcon />}
                variant="outlined"
                onClick={() => {
                  const headers = ["تاريخ الدفعة", "قيمة الدفعة"];
                  const rows = customerInfo?.paymentData.map((p) => [
                    p.paymentDate,
                    p.paymentAmount,
                  ]);
                  exportTableToExcel(rows, "الدفعات", headers);
                }}
              >
                تصدير الدفعات
              </Button>
            </Box>

            <Table>
              <TableHead
                sx={{
                  backgroundColor: "rgb(0, 61, 118)",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                <TableRow
                  sx={{
                    backgroundColor: "rgb(0, 61, 118)",
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                >
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold" }}
                    align="center"
                  >
                    تاريخ الدفعة
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold" }}
                    align="center"
                  >
                    قيمة الدفعة (د.أ)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerInfo.paymentData.map((pay, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{pay.paymentDate}</TableCell>
                    <TableCell align="center">{pay.paymentAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography align="center">لا يوجد دفعات</Typography>
        )}
      </TabPanel>

      {/* نتائج البحث */}
      <TabPanel value={tabValue} index={0}>
        {customerInfo ? (
          <>
            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 900,
                color: "rgb(0, 61, 118)",
                mb: 2,
              }}
              align="center"
            >
              نتائج البحث
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <SubscriptionDetails />

            {hasVigilance && (
              <Box sx={{ mt: 3 }}>
                <VigilantDetails />
              </Box>
            )}

            {hasInstallments && (
              <Box sx={{ mt: 3 }}>
                <InstallmentDetails />
              </Box>
            )}
          </>
        ) : (
          <Typography align="center">لا يوجد نتائج</Typography>
        )}
      </TabPanel>
    </Box>
  );
}
