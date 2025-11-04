import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ExcelJS from "exceljs";

export const exportTableToExcel = (data, fileName, headers) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  // Add header row
  worksheet.addRow(headers);

  // Add data rows
  data.forEach((row) => {
    worksheet.addRow(row);
  });

  // Style: auto width + center
  worksheet.columns.forEach((col) => {
    col.width = 20;
  });
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
