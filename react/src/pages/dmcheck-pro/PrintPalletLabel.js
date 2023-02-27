import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

const PrintPalletLabel = (props) => {
  const qrCodeRef = useRef(null);

  const generatePrintWindow = (imgData) => {
    const printWindow = window.open();
    printWindow.document.write(`
      <html>
        <head>
          <style>
            @media print {
              .print-window {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .print-window--image img {
                height: 50mm;
              }
              .print-window--table {
                border-collapse: collapse;
                border: 1px solid black;
                margin-top: 5mm;
              }
              .print-window--table th, .print-window--table td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-window">
            <div class="print-window--image">
              <img src="${imgData}" />
            </div>
            <table class="print-window--table">
              <thead>
                <tr>
                  <th>Article</th>
                  <th>Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${props.article}</td>
                  <td>${props.name}</td>
                  <td>${props.quantity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000);
  };

  const handlePrint = () => {
    const qrCodeCanvas = qrCodeRef.current.querySelector('canvas');
    html2canvas(qrCodeCanvas, { scale: 2 })
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        generatePrintWindow(imgData);
      })
      .catch(error => {
        console.error('Error generating canvas from QR code:', error);
      });
  };

  return (
    <div className='print-pallet-label'>
      <div ref={qrCodeRef}>
      <QRCode className='print-pallet-label--qr' value={props.palletQr}/>
      </div>
      <button className='print-pallet-label--button' onClick={handlePrint}>Wydruk etykiety</button>
    </div>
  );
};

export default PrintPalletLabel;
