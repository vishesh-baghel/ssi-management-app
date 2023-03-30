package com.stackroute.ssiservice.export;

import com.stackroute.ssiservice.model.SsiDetails;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class ExcelGenerator {
    private List<SsiDetails> ssiDetailsList;
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;

    public ExcelGenerator(List <SsiDetails> ssiDetailsList) {
        this.ssiDetailsList = ssiDetailsList;
        workbook = new XSSFWorkbook();
    }
    private void writeHeader() {
        sheet = workbook.createSheet("ssiDetails");
        Row row = sheet.createRow(0);
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);
        createCell(row, 0, "SsiRefId", style);
        createCell(row, 1, "Product", style);
        createCell(row, 2, "Account Name", style);
        createCell(row, 3, "Account Type", style);
        createCell(row, 4, "Account Number", style);
        createCell(row, 5, "Asset Class", style);
        createCell(row, 6, "Currency", style);
        createCell(row, 7, "Country", style);
        createCell(row, 8, "Routing code", style);
        createCell(row, 9, "Corres. Account Number", style);
        createCell(row, 10, "Corres. Account Name", style);
        createCell(row, 11, "Corres. Bank Name", style);
        createCell(row, 12, "Corres. Bank Bic", style);
        createCell(row, 13, "Benef. Account Number", style);
        createCell(row, 14, "Benef. Account Name", style);
        createCell(row, 15, "Benef. Bank Name", style);
        createCell(row, 16, "Benef. Bank Bic", style);
    }
    private void createCell(Row row, int columnCount, Object valueOfCell, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (valueOfCell instanceof Integer) {
            cell.setCellValue((Integer) valueOfCell);
        } else if (valueOfCell instanceof Long) {
            cell.setCellValue((Long) valueOfCell);
        } else if (valueOfCell instanceof String) {
            cell.setCellValue((String) valueOfCell);
        } else if (valueOfCell instanceof LocalDateTime) {
            cell.setCellValue((LocalDateTime) valueOfCell);
        } else {
            cell.setCellValue((Boolean) valueOfCell);
        }
        cell.setCellStyle(style);
    }
    private void write() {
        int rowCount = 1;
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);
        for (SsiDetails record: ssiDetailsList) {
            if (record.getAccountType() == null) {
                record.setAccountType("N/A");
            }
            if (record.getCorrespondanceAccountNumber() == null) {
                record.setCorrespondanceAccountNumber("N/A");
            }
            if (record.getCorrespondanceAccountName() == null) {
                record.setCorrespondanceAccountName("N/A");
            }
            if (record.getCorrespondanceBankName() == null) {
                record.setCorrespondanceBankName("N/A");
            }
            if (record.getCorrespondanceBankBic() == null) {
                record.setCorrespondanceBankBic("N/A");
            }
            if (record.getEffectiveDate() == null) {
                LocalDateTime localDateTime = LocalDateTime.now();
                record.setEffectiveDate(localDateTime);
            }
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;
            createCell(row, columnCount++, record.getSsiRefId(), style);
            createCell(row, columnCount++, record.getProduct(), style);
            createCell(row, columnCount++, record.getAccountName(), style);
            createCell(row, columnCount++, record.getAccountType(), style);
            createCell(row, columnCount++, record.getAccountNumber(), style);
            createCell(row, columnCount++, record.getAssetClass(), style);
            createCell(row, columnCount++, record.getCurrency(), style);
            createCell(row, columnCount++, record.getCountry(), style);
            createCell(row, columnCount++, record.getRoutingCode(), style);
            createCell(row, columnCount++, record.getCorrespondanceAccountNumber(), style);
            createCell(row, columnCount++, record.getCorrespondanceAccountName(), style);
            createCell(row, columnCount++, record.getCorrespondanceBankName(), style);
            createCell(row, columnCount++, record.getCorrespondanceBankBic(), style);
            createCell(row, columnCount++, record.getBeneficiaryBankName(), style);
            createCell(row, columnCount++, record.getBeneficiaryBankBic(), style);
            createCell(row, columnCount++, record.getIntermediary1AccountNumber(), style);
            createCell(row, columnCount++, record.getIntermediary1BankBic(), style);
            createCell(row, columnCount++, record.getEffectiveDate(), style);
            createCell(row, columnCount++, record.getExpiryDate(), style);
        }
    }
    public void generateExcelFile(HttpServletResponse response) throws IOException {
        writeHeader();
        write();
        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
    }
}
