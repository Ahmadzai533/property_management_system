// // src/pages/finance/index.jsx
// import { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import PaymentsInvoices from '../finance/PaymentsInvoices';
// import RentRollLedger from '../finace/RentRollLedger';
// import TransactionHistory from '../finace/TransactionHistory';

// export default function Finance() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="payments" replace />} />
//       <Route path="payments" element={<PaymentsInvoices />} />
//       <Route path="ledger" element={<RentRollLedger />} />
//       <Route path="transactions" element={<TransactionHistory />} />
//     </Routes>
//   );
// }