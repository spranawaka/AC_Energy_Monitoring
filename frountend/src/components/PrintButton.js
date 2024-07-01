import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PrintButton = ({ tableId }) => {
  const handlePrint = () => {
    const input = document.getElementById(tableId);
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('table-data.pdf');
      });
  };

  return (
    <button onClick={handlePrint} className="btn btn-primary">
      Print to PDF
    </button>
  );
};

export default PrintButton;
