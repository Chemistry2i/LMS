import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import toast from 'react-hot-toast';

/**
 * Export data to PDF
 * @param {Array} data - Array of objects to export
 * @param {Array} columns - Column definitions [{header: 'Title', dataKey: 'title'}, ...]
 * @param {String} filename - Output filename
 * @param {String} title - PDF title
 */
export const exportToPDF = (data, columns, filename = 'report.pdf', title = 'Report') => {
  try {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text(title, 14, 22);
    
    // Add timestamp
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);
    
    // Prepare table data
    const tableColumns = columns.map(col => col.header);
    const tableData = data.map(row => 
      columns.map(col => {
        const value = row[col.dataKey];
        // Format based on type
        if (typeof value === 'number') return value.toLocaleString();
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        return value || '-';
      })
    );
    
    // Add table
    doc.autoTable({
      head: [tableColumns],
      body: tableData,
      startY: 40,
      styles: {
        fontSize: 10,
        cellPadding: 5,
        overflow: 'linebreak',
      },
      headStyles: {
        fillColor: [14, 165, 233],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [242, 242, 242],
      },
      margin: 14,
    });
    
    // Save PDF
    doc.save(`${filename}-${new Date().getTime()}.pdf`);
    toast.success('PDF exported successfully');
  } catch (error) {
    console.error('PDF export error:', error);
    toast.error('Failed to export PDF');
  }
};

/**
 * Export data to Excel
 * @param {Array} data - Array of objects to export
 * @param {String} filename - Output filename
 * @param {String} sheetName - Sheet name (default: 'Data')
 */
export const exportToExcel = (data, filename = 'report.xlsx', sheetName = 'Data') => {
  try {
    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Auto-size columns
    const colWidths = Object.keys(data[0] || {}).map(() => ({ wch: 15 }));
    worksheet['!cols'] = colWidths;
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    // Save file
    XLSX.writeFile(workbook, `${filename}-${new Date().getTime()}.xlsx`);
    toast.success('Excel file exported successfully');
  } catch (error) {
    console.error('Excel export error:', error);
    toast.error('Failed to export Excel');
  }
};

/**
 * Export data to CSV
 * @param {Array} data - Array of objects to export
 * @param {String} filename - Output filename
 */
export const exportToCSV = (data, filename = 'report.csv') => {
  try {
    // Use papaparse to convert data to CSV
    const csv = Papa.unparse(data);
    
    // Create blob
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
    // Create URL and download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('CSV exported successfully');
  } catch (error) {
    console.error('CSV export error:', error);
    toast.error('Failed to export CSV');
  }
};

/**
 * Export author data with statistics
 * @param {Array} authorData - Author statistics array
 * @param {String} format - 'pdf' | 'excel' | 'csv'
 */
export const exportAuthorData = (authorData, format = 'pdf') => {
  const transformedData = authorData.map(author => ({
    'Author Name': author.name,
    'Total Borrows': author.count,
    'Unique Readers': author.reach,
    'Books in Collection': author.titles,
  }));
  
  const columns = [
    { header: 'Author Name', dataKey: 'Author Name' },
    { header: 'Total Borrows', dataKey: 'Total Borrows' },
    { header: 'Unique Readers', dataKey: 'Unique Readers' },
    { header: 'Books in Collection', dataKey: 'Books in Collection' },
  ];
  
  switch (format) {
    case 'pdf':
      exportToPDF(transformedData, columns, 'author-rankings', 'Top Trending Authors Report');
      break;
    case 'excel':
      exportToExcel(transformedData, 'author-rankings.xlsx', 'Authors');
      break;
    case 'csv':
      exportToCSV(transformedData, 'author-rankings');
      break;
    default:
      toast.error('Invalid export format');
  }
};

/**
 * Export fine recovery data
 * @param {Array} fineData - Weekly fine recovery array
 * @param {String} format - 'pdf' | 'excel' | 'csv'
 */
export const exportFineRecoveryData = (fineData, format = 'pdf') => {
  const transformedData = fineData.map(day => ({
    'Day': day.day,
    'Projected Collection': day.projected,
    'Actual Collection': day.collected,
    'Recovery Rate': `${Math.round((day.collected / day.projected) * 100)}%`,
  }));
  
  const columns = [
    { header: 'Day', dataKey: 'Day' },
    { header: 'Projected Collection', dataKey: 'Projected Collection' },
    { header: 'Actual Collection', dataKey: 'Actual Collection' },
    { header: 'Recovery Rate', dataKey: 'Recovery Rate' },
  ];
  
  switch (format) {
    case 'pdf':
      exportToPDF(transformedData, columns, 'fine-recovery', 'Weekly Fine Recovery Report');
      break;
    case 'excel':
      exportToExcel(transformedData, 'fine-recovery.xlsx', 'Fine Recovery');
      break;
    case 'csv':
      exportToCSV(transformedData, 'fine-recovery');
      break;
    default:
      toast.error('Invalid export format');
  }
};

/**
 * Export institutional report (comprehensive)
 * @param {Object} reportData - Complete report data
 * @param {String} format - 'pdf' | 'excel'
 */
export const exportInstitutionalReport = (reportData, format = 'pdf') => {
  try {
    if (format === 'pdf') {
      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 20;
      
      // Title
      doc.setFontSize(18);
      doc.text('Institutional Report - Kampala Main Branch', 14, yPosition);
      yPosition += 10;
      
      // Metadata
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, yPosition);
      yPosition += 8;
      
      // Section 1: Summary Statistics
      doc.setFontSize(12);
      doc.text('Summary Statistics', 14, yPosition);
      yPosition += 8;
      
      const summaryData = [
        ['Metric', 'Value'],
        ['Top Category', reportData.categoryStats?.name || 'N/A'],
        ['Category Share', `${reportData.categoryStats?.percent || 0}%`],
        ['New Members', reportData.newMembersCount || 0],
        ['Fine Recovery Rate', `${reportData.fineRecoveryPercent || 0}%`],
      ];
      
      doc.autoTable({
        head: [summaryData[0]],
        body: summaryData.slice(1),
        startY: yPosition,
        margin: 14,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [14, 165, 233] },
      });
      
      yPosition = doc.lastAutoTable.finalY + 15;
      
      // Section 2: Top Authors
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(12);
      doc.text('Top Trending Authors', 14, yPosition);
      yPosition += 8;
      
      const authorTableData = reportData.authorData?.map(author => [
        author.name,
        author.count.toString(),
        author.reach.toString(),
        author.titles.toString(),
      ]) || [];
      
      doc.autoTable({
        head: [['Author', 'Total Borrows', 'Unique Readers', 'Books']],
        body: authorTableData,
        startY: yPosition,
        margin: 14,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [14, 165, 233] },
      });
      
      doc.save(`institutional-report-${new Date().getTime()}.pdf`);
      toast.success('Institutional report exported as PDF');
    } else if (format === 'excel') {
      const workbook = XLSX.utils.book_new();
      
      // Sheet 1: Summary
      const summaryData = [{
        'Top Category': reportData.categoryStats?.name,
        'Category Share %': reportData.categoryStats?.percent,
        'New Members': reportData.newMembersCount,
        'Fine Recovery %': reportData.fineRecoveryPercent,
      }];
      
      const summarySheet = XLSX.utils.json_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
      
      // Sheet 2: Authors
      const authorSheet = XLSX.utils.json_to_sheet(
        reportData.authorData?.map(a => ({
          'Author Name': a.name,
          'Total Borrows': a.count,
          'Unique Readers': a.reach,
          'Books Count': a.titles,
        })) || []
      );
      XLSX.utils.book_append_sheet(workbook, authorSheet, 'Authors');
      
      // Sheet 3: Fine Recovery
      const fineSheet = XLSX.utils.json_to_sheet(
        reportData.fineRecoveryData?.map(d => ({
          'Day': d.day,
          'Projected': d.projected,
          'Collected': d.collected,
          'Rate %': Math.round((d.collected / d.projected) * 100),
        })) || []
      );
      XLSX.utils.book_append_sheet(workbook, fineSheet, 'Fine Recovery');
      
      XLSX.writeFile(workbook, `institutional-report-${new Date().getTime()}.xlsx`);
      toast.success('Institutional report exported as Excel');
    }
  } catch (error) {
    console.error('Report export error:', error);
    toast.error('Failed to export report');
  }
};
