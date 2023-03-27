import React, { useRef } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";

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
    }, 1500);
  };

  const handlePrint = () => {
    const qrCodeCanvas = qrCodeRef.current.querySelector("canvas");
    html2canvas(qrCodeCanvas, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        generatePrintWindow(imgData);
      })
      .catch((error) => {
        console.error("Error generating canvas from QR code:", error);
      });
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <div ref={qrCodeRef}>
        <QRCode value={props.palletQr} />
      </div>
      <button
        className="mt-8 inline-block w-52 rounded bg-gray-200 px-2 py-4 text-center text-xl font-thin text-gray-800 shadow-md transition-colors duration-300 hover:bg-bruss hover:text-white"
        onClick={handlePrint}
      >
        wydruk etykiety
      </button>
    </div>
  );
};

export default PrintPalletLabel;
