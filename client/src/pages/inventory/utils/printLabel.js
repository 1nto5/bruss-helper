export const printLabel = (cardNumber, positionNumber) => {
  const printWindow = window.open()
  printWindow.document.write(`<html>
        <head>
          <style>
            @media print {
              .print-window {
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 21mm;
                width: 55mm;
                padding: 0mm;
              }
              .print-window--title {
                font-size: 22px;
                font-weight: bold;
              }
              .print-window--table {
                border-collapse: collapse;
                border: 0.5px solid black;
                font-size: 16px;
                width: 100%;
              }
              .print-window--table th,
              .print-window--table td {
                border: 1px solid black;
                text-align: center;
                min-width: 5mm;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-window">
            <div class="print-window--title">INWENTARYZACJA</div>
            <table class="print-window--table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Godz.</th>
                  <th>K</th>
                  <th>P</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${new Date().toLocaleDateString()}</td>
                  <td>${new Date().toLocaleTimeString()}</td>
                  <td>${cardNumber}</td>
                  <td>${positionNumber}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>`)
  printWindow.document.close()
  printWindow.focus()
  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 1500)
}
