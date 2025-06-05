// 'use client'; 

// import React, { useState, useRef, useEffect } from 'react';
// import {
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Typography,
//   Divider,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   SelectChangeEvent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import * as ExcelJS from 'exceljs';

// const exportToExcel = async (filteredTableData: any[]) => {
//   if (!filteredTableData || filteredTableData.length === 0) {
//     alert('No data to export.');
//     return;
//   }

//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet('Selected Features Data');

//   // Add headers
//   worksheet.addRow(headerColumns);

//   // Style the header row (blue background, white text, bold)
//   const headerRow = worksheet.getRow(1);
//   headerRow.eachCell((cell) => {
//     cell.fill = {
//       type: 'pattern',
//       pattern: 'solid',
//       fgColor: { argb: '0071B3' },
//     };
//     cell.font = {
//       color: { argb: 'FFFFFF' },
//       bold: true,
//     };
//   });
//   headerRow.height = 30; // Set header row height
//   headerColumns.forEach((_, index) => {
//     worksheet.getColumn(index + 1).width = 35; // Set column width
//   });

//   // Add data rows
//   filteredTableData.forEach((row) => {
//     const rowData = headerColumns.map((column) => row[column]);
//     const dataRow = worksheet.addRow(rowData);
//     dataRow.height = 20; // Set data row height
//   });

//   const now = new Date();
//     const formattedDateTime = `${now.getFullYear()}-${(now.getMonth() + 1)
//       .toString()
//       .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now
//       .getHours()
//       .toString()
//       .padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now
//       .getSeconds()
//       .toString()
//       .padStart(2, '0')}`;
//     const filename = `selected_features_data_${formattedDateTime}.xlsx`;

//     // Generate and download the Excel file
//     const buffer = await workbook.xlsx.writeBuffer();
//     const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     const url = window.URL.createObjectURL(data);
//     const anchor = document.createElement('a');
//     anchor.href = url;
//     anchor.download = filename;
//     document.body.appendChild(anchor);
//     anchor.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(anchor);
//   };

// const allCapabilities = [
//   'Account Management',
//   'Integrated Journey',
//   'Case Management',
//   'Technical Solutions',
//   'Order Status',
//   'Technical Publications',
//   'Software Downloads',
//   'Software Upload',
//   'Invoice Management',
//   'Subscription Management',
// ];

// const rawTableData = [
//   {
//     Capability: 'Account Management',
//     'GDM onboarding (Frontend/Backend)': '$1,000.00',
//     'GDM onboarding (Backend)': '$1,500.00',
//     'Sub-Total': '$2,310.00',
//     'Next gen frontend': '$68,000',
//     'Technology Stack': 'AEM/React, Microservices, APIGEE, Salesforce, 3DS',
//     AEM: '$115,000',
//     SFDC: '$75,000',
//     Apigee: '$25,000',
//     PIF: '$21,000',
//     'Informatica ETL': null,
//     Microservices: '$75,000',
//     'SAP ERP': null,
//     'SAP HANA': null,
//     eDAM: null,
//     Azure: null,
//     PIM: null,
//     Total: '$321,000',
//   },
//   {
//     Capability: 'Integrated Journey',
//     'GDM onboarding (Frontend/Backend)': '$1,250.00',
//     'GDM onboarding (Backend)': '$1,750.00',
//     'Sub-Total': '$2,500.00',
//     'Next gen frontend': '$75,000',
//     'Technology Stack': 'AEM, Microservices, APIGEE, Salesforce, SAP ERP, SAP S/4HANA, ETL, EPM',
//     AEM: '$110,000',
//     SFDC: '$118,000',
//     Apigee: '$15,000',
//     PIF: '$11,000',
//     'Informatica ETL': '$111,000',
//     Microservices: '$25,000',
//     'SAP ERP': '$85,000',
//     'SAP HANA': '$68,000',
//     eDAM: '$66,000',
//     Azure: '$66,000',
//     PIM: '$88,000',
//     Total: '$1,063,750',
//   },
//   {
//     Capability: 'Case Management',
//     'GDM onboarding (Frontend/Backend)': '$75.00',
//     'GDM onboarding (Backend)': '$60.00',
//     'Sub-Total': '$1,250.00',
//     'Next gen frontend': '$50,000',
//     'Technology Stack': 'AEM/React, Microservices, APIGEE, Salesforce, Informatica ETL, Elastic',
//     AEM: '$55,000',
//     SFDC: '$29,000',
//     Apigee: '$15,000',
//     PIF: '$11,000',
//     'Informatica ETL': '$10,000',
//     Microservices: '$30,000',
//     'SAP ERP': null,
//     'SAP HANA': null,
//     eDAM: null,
//     Azure: null,
//     PIM: null,
//     Total: '$160,385',
//   },
//   {
//     Capability: 'Technical Solutions',
//     'GDM onboarding (Frontend/Backend)': '$68.00',
//     'GDM onboarding (Backend)': '$70.00',
//     'Sub-lead onboarding': '$1,560.00',
//     'Next gen frontend': '$54,000',
//     'Technology Stack': 'AEM/React, Microservices, APIGEE, Salesforce, Informatica ETL, Elastic',
//     AEM: '$60,000',
//     SFDC: '$25,000',
//     Apigee: '$15,000',
//     PIF: '$11,000',
//     'Informatica ETL': '$10,000',
//     Microservices: '$35,000',
//     'SAP ERP': null,
//     'SAP HANA': null,
//     eDAM: null,
//     Azure: null,
//     PIM: null,
//     Total: '$195,708',
//   },
//   {
//     Capability: 'Order Status',
//     'GDM onboarding (Frontend/Backend)': '$1,300.00',
//     'GDM onboarding (Backend)': '$2,500.00',
//     'Sub-lead onboarding': '$3,500.00',
//     'Next gen frontend': '$64,000',
//     'Technology Stack': 'AEM/React, Microservices, APIGEE, Salesforce, Informatica ETL, Elastic, SAP S/4HANA',
//     AEM: '$75,000',
//     RFDC: '$28,000',
//     Apigee: '$25,000',
//     PIF: '$20,000',
//     'Informatica ETL': '$25,000',
//     Microservices: '$25,000',
//     'SAP ERP': '$52,000',
//     'SAP HANA': '$75,000',
//     eDAM: null,
//     Azure: null,
//     PIM: null,
//     Total: '$396,300',
//   },
//   {
//     Capability: 'Technical Publications',
//     'GDM onboarding (Frontend/Backend)': '$1,500.00',
//     'GDM onboarding (Backend)': '$2,000.00',
//     'Sub-lead onboarding': '$4,000.00',
//     'Next gen frontend': '$75,000',
//     'Technology Stack': 'AEM/React, Microservices, APIGEE, Salesforce, Informatica ETL, Elastic, EPM',
//     AEM: '$110,000',
//     SFDC: '$40,000',
//     Apigee: '$30,000',
//     PIF: '$25,000',
//     'Informatica ETL': '$25,000',
//     Microservices: '$35,000',
//     'SAP ERP': '$107,000',
//     'SAP HANA': null,
//     eDAM: null,
//     Azure: null,
//     PIM: null,
//     Total: '$453,500',
//   },
//   {
//     Capability: 'Software Downloads',
//     'GDM onboarding (Frontend/Backend)': '$1,500.00',
//     'GDM onboarding (Backend)': '$2,000.00',
//     'Sub-Total': '$3,000.00',
//     'Next gen frontend': '$68,000',
//     'Technology Stack': 'AEM/React, Microservices, APIGEE, Salesforce, Informatica ETL, Azure, Elastic',
//     AEM: '$110,000',
//     SFDC: '$40,000',
//     Apigee: '$25,000',
//     PIF: '$25,000',
//     'Informatica ETL': '$20,000',
//     Microservices: '$30,000',
//     'SAP ERP': '$115,000',
//     'SAP HANA': '$315,000',
//     eDAM: '$115,000',
//     Azure: '$75,000',
//     PIM: '$115,000',
//     Total: '$1,098,500',
//   },
//   {
//     Capability: 'Software Upload',
//     'GDM onboarding (Frontend/Backend)': '$88.00',
//     'GDM onboarding (Backend)': '$2,000.00',
//     'Sub-Total': '$2,600.00',
//     'Next gen frontend': '$55,000',
//     'Technology Stack': 'AEM/React, Microservices, APIGEE, Azure',
//     AEM: '$115,000',
//     RFDC: '$25,000',
//     Apigee: '$20,000',
//     PIF: '$11,000',
//     'Informatica ETL': '$111,000',
//     Microservices: '$30,000',
//     'SAP ERP': '$115,000',
//     'SAP HANA': '$115,000',
//     eDAM: '$45,000',
//     Azure: '$45,000',
//     PM: '$115,000',
//     Total: '$934,688',
//   },
//   {
//     Capability: 'Invoice Management',
//     'GDM onboarding (Frontend/Backend)': '$1,500.00',
//     'GDM onboarding (Backend)': '$4,000.00',
//     'Sub-Total': '$4,000.00',
//     'Next gen frontend': '$50,000',
//     'Technology Stack': 'AEM/React, Microservices, APIGEE, Salesforce, SAP S/4HANA',
//     AEM: '$75,000',
//     SFDC: '$30,000',
//     Apigee: '$75,000',
//     PIF: '$11,000',
//     'Informatica ETL': '$75,000',
//     Microservices: '$75,000',
//     'SAP ERP': '$55,000',
//     'SAP HANA': '$55,000',
//     eDAM: null,
//     Azure: '$55,000',
//     PIM: '$55,000',
//     Total: '$611,500',
//   },
//   {
//     Capability: 'Subscription Management',
//     'GDM onboarding (Frontend/Backend)': '$1,500.00',
//     'GDM onboarding (Backend)': '$2,500.00',
//     'Sub-Total': '$4,000.00',
//     'Next gen frontend': '$50,000',
//     'Technology Stack': 'AEM/React, Microservices, APIGEE, Salesforce, Informatica ETL, Elastic',
//     AEM: '$80,000',
//     SFDC: '$30,000',
//     Apigee: '$30,000',
//     PIF: '$11,000',
//     'Informatica ETL': '$15,000',
//     Microservices: '$95,000',
//     'SAP ERP': '$75,000',
//     'SAP HANA': '$15,000',
//     eDAM: '$15,000',
//     Azure: '$35,000',
//     PIM: '$35,000',
//     Total: '$564,000',
//   },
// ];

// const headerColumns = [
//   'Capability',
//   'GDM onboarding (Frontend/Backend)',
//   'GDM onboarding (Backend)',
//   'Sub-Total',
//   'Next gen frontend',
//   'Technology Stack',
//   'AEM',
//   'RFDC',
//   'Apigee',
//   'PIF',
//   'Informatica ETL',
//   'Microservices',
//   'SAP ERP',
//   'SAP HANA',
//   'eDAM',
//   'Azure',
//   'PIM',
//   'Total',
// ];

// export default function HomePage() {
//   const [sbg, setSbg] = useState<keyof typeof sbuOptions | ''>('');
//   const [sbu, setSbu] = useState('');
//   const [showFeatures, setShowFeatures] = useState(false);
//   const [animateFeatures, setAnimateFeatures] = useState(false);
//   const [hasUserSelected, setHasUserSelected] = useState(false); // Tracks if SBG and SBU are selected
//   const [isSbgSbuDisabled, setIsSbgSbuDisabled] = useState(false); // To disable SBG and SBU once selected
//   const router = useRouter();
//   const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
//   const [filteredTableData, setFilteredTableData] = useState<any[]>([]);

//   const sbgOptions = ['AERO', 'BA', 'IA', 'ESS'];
//   const sbuOptions = {
//     AERO: ['AERO'],
//     BA: ['BA'],
//     IA: ['IA', 'HPS', 'PPE'],
//     ESS: ['UOP', 'ADM'],
//   };

//   const handleSbgChange = (event: SelectChangeEvent<keyof typeof sbuOptions | ''>) => {
//     const selectedSbg = event.target.value as keyof typeof sbuOptions | '';
//     setSbg(selectedSbg);
//     setSbu('');
//     setShowFeatures(false);
//     setAnimateFeatures(false);
//   };

//   const handleSbuChange = (event: SelectChangeEvent<string>) => {
//     setSbu(event.target.value);
//   };

//   const handleCapabilityChange = (capability: string) => {
//     setSelectedCapabilities((prev) =>
//       prev.includes(capability)
//         ? prev.filter((item) => item !== capability)
//         : [...prev, capability]
//     );
//   };

//   const tableContainerRef =  useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     if (filteredTableData.length > 0 && tableContainerRef.current) {
//       tableContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   }, [filteredTableData]);

//   const handleSubmit = () => {
//     if (sbg && sbu) {
//       setHasUserSelected(true); // Fix SBG and SBU to the left once selected
//       setIsSbgSbuDisabled(true); // Disable SBG and SBU dropdowns after selection
//       setShowFeatures(true);
//       setTimeout(() => setAnimateFeatures(true), 100); // Trigger animation for the feature box
//     } else {
//       alert('Please select both SBG and SBU before submitting.');
//     }
//   };

//   const handleFinalSubmit = () => {
//     if (selectedCapabilities.length === 0) {
//       alert('Please select at least one capability.');
//       return;
//     }
//     // Filter the table data based on selected capabilities
//     const filteredData = rawTableData.filter((item) =>
//       selectedCapabilities.includes(item.Capability)
//     );
//     setFilteredTableData(filteredData);

//     // You can also navigate to a result page if needed
//     // const query = selectedCapabilities
//     //   .map((cap) => `capabilities=${encodeURIComponent(cap)}`)
//     //   .join('&');
//     // router.push(`/result?${query}`);
//   };

//   return (
//     <main
//       style={{
//         paddingTop: '12px',
//         paddingBottom: '20px',
//         fontFamily: 'honeywell sans',
//         backgroundColor: '#ffffff',
//         minHeight: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: '5px',
//         maxWidth: '1600px',
//         margin: '0 auto',
//       }}
//     >
//       <div
//         style={{
//           width: '100%',
//           height: '60px',
//           backgroundColor: '#ffffff',
//           padding: '20px 30px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '15px',
//         }}
//       >
//         <img
//           src="/header.png"
//           alt="Logo"
//           style={{ width: '220px', height: '43px', cursor: 'pointer' }}
//           onClick={() => window.location.reload()}
//         />
//         <div style={{ width: '2px', height: '40px', backgroundColor: '#cccccc' }}></div>
//         <Typography
//           variant="h6"
//           style={{ fontWeight: 'lighter', color: '#6a6a6a' }}
//         >
//           COST ESTIMATION TOOL
//         </Typography>
//       </div>

//       <Divider
//         style={{
//           width: '100%',
//           borderColor: '#cccccc',
//           marginBottom: '5px',
//         }}
//       />

//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           gap: '24px',
//           flexWrap: 'wrap',
//           width: '100%',
//           maxWidth: '1600px',
//           padding: '16px',
//           alignItems: 'flex-start',
//           minHeight: '200px',
//         }}
//       >
//         {/* SBG + SBU Box */}
//         <div
//           style={{
//             width: '100%',
//             maxWidth: '480px',
//             padding: '24px',
//             marginLeft: hasUserSelected ? '0' : 'auto',
//             marginRight: hasUserSelected ? '0' : 'auto',
//             transition: 'margin 0.3s ease-in-out', // Smooth transition
//           }}
//         >
//           <Typography
//             variant="h5"
//             style={{
//               marginBottom: '20px',
//               color: '#333',
//               fontFamily: 'honeywell sans',
//               fontSize: '20px',
//             }}
//           >
//             Select Business Group & Unit
//           </Typography>

//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               gap: '16px',
//               flexWrap: 'wrap',
//             }}
//           >
//             <FormControl fullWidth>
//               <InputLabel>SBG</InputLabel>
//               <Select
//                 value={sbg}
//                 onChange={handleSbgChange}
//                 label="SBG"
//                 disabled={isSbgSbuDisabled} // Disable the dropdown once selected
//                 style={{
//                   backgroundColor: '#f4f6f8',
//                   borderRadius: '8px',
//                 }}
//               >
//                 <MenuItem value="">-- Select SBG --</MenuItem>
//                 {sbgOptions.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl fullWidth disabled={!sbg || isSbgSbuDisabled}>
//               <InputLabel>SBU</InputLabel>
//               <Select
//                 value={sbu}
//                 onChange={(event) => setSbu(event.target.value)}
//                 label="SBU"
//                 disabled={isSbgSbuDisabled} // Disable the dropdown once selected
//                 style={{
//                   backgroundColor: sbg ? '#f4f6f8' : '#e0e0e0',
//                   borderRadius: '8px',
//                 }}
//               >
//                 <MenuItem value="">-- Select SBU --</MenuItem>
//                 {sbg &&
//                   sbuOptions[sbg]?.map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </div>

//           {/* Submit Button (Only visible when SBG and SBU are not selected) */}
//           {!hasUserSelected && (
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//                 style={{
//                   backgroundColor: '#007bff',
//                   color: '#ffffff',
//                   textTransform: 'none',
//                   borderRadius: '8px',
//                 }}
//               >
//                 Submit
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Feature Box */}
//         {showFeatures && (
//           <div
//             style={{
//               width: '100%',
//               maxWidth: '530px',
//               padding: '24px',
//               paddingLeft: '20px',
//               opacity: animateFeatures ? 1 : 0,
//               transform: animateFeatures ? 'translateY(0)' : 'translateY(20px)',
//               transition: 'opacity 0.6s ease, transform 0.6s ease',
//             }}
//           >
//             <Typography
//               variant="h5"
//               style={{
//                 marginBottom: '16px',
//                 color: '#333',
//                 fontFamily: 'honeywell sans',
//                 fontSize: '20px',
//                 paddingLeft: '8px',
//               }}
//             >
//               Select Features/Capabilities
//             </Typography>

//             <div
//               style={{
//                 backgroundColor: '#f4f6f8',
//                 borderRadius: '8px',
//                 padding: '20px',
//                 paddingLeft: '30px',
//                 width: '80%',
//                 color: '#333',
//                 fontFamily: 'honeywell sans',
//               }}
//             >
//               <FormGroup>
//                 {allCapabilities.map((cap) => (
//                   <FormControlLabel
//                     key={cap}
//                     control={
//                       <Checkbox
//                         checked={selectedCapabilities.includes(cap)}
//                         onChange={() => handleCapabilityChange(cap)}
//                         sx={{
//                           color: '#7f7f7f',
//                           '&.Mui-checked': {
//                             color: '#258df5',
//                           },
//                         }}
//                       />
//                     }
//                     label={cap}
//                   />
//                 ))}
//               </FormGroup>
//             </div>

//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 marginTop: '20px',
//               }}
//             >
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleFinalSubmit}
//                 style={{
//                   backgroundColor: '#007bff',
//                   color: '#ffffff',
//                   textTransform: 'none',
//                   borderRadius: '8px',
//                   marginRight: '105px',
//                 }}
//               >
//                 Submit
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Display the filtered table */}
//     {filteredTableData.length > 0 && (
//     <div 
//       ref={tableContainerRef}
//       style={{ width: '95%', margin: '20px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
//       <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
//         <Table sx={{ size: 'small', width: '100%', borderCollapse: 'collapse' }} aria-label="cost estimation table">
//           <TableHead sx={{ backgroundColor: '#0071b3' }}>
//             <TableRow>
//               {headerColumns.map((column) => (
//                 <TableCell
//                   key={column}
//                   sx={{
//                     color: '#ffffff',
//                     fontWeight: 'bold',
//                     padding: '8px', // Reduced padding for compactness
//                     fontSize: '0.8rem', // Further reduce font size if needed
//                   }}
//                 >
//                   {column}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredTableData.map((row, index) => (
//               <TableRow
//                 key={index}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 {headerColumns.map((column) => (
//                   <TableCell key={column} sx={{ padding: '8px', fontSize: '0.8rem' }}>
//                     {row[column]}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => exportToExcel(filteredTableData)}
//         style={{ marginTop: '16px', textTransform: 'none' }}
//       >
//         Export to Excel
//       </Button>
//     </div>
//   )}

//       <img
//         src="/footer.png"
//         alt="Footer Image"
//         style={{
//           width: '150%',
//           height: 'auto', // Adjusted height for responsiveness
//           display: 'block',
//           marginTop: '20px', // Added some top margin
//         }}
//       />
//     </main>
//   );
// }










// {/*with card view*}

// // 'use client';

// // import { useState } from 'react';
// // import {
// //   MenuItem,
// //   Select,
// //   FormControl,
// //   InputLabel,
// //   Typography,
// //   Box,
// //   Paper,
// //   SelectChangeEvent,
// //   Divider,
// //   Button,
// //   Checkbox,
// //   FormControlLabel,
// //   FormGroup,
// // } from '@mui/material';
// // import { useRouter } from 'next/navigation';

// // const allCapabilities = [
// //   'Account Management',
// //   'Integrated Journey',
// //   'Case Management',
// //   'Technical Solutions',
// //   'Order Status',
// //   'Technical Publications',
// //   'Software Downloads',
// //   'Software Upload',
// //   'Invoice Management',
// //   'Subscription Management',
// // ];

// // export default function HomePage() {
// //   const [sbg, setSbg] = useState<keyof typeof sbuOptions | ''>('');
// //   const [sbu, setSbu] = useState('');
// //   const [showFeatures, setShowFeatures] = useState(false);
// //   const [animateFeatures, setAnimateFeatures] = useState(false); // For feature table animation
// //   const [animateSbgSbu, setAnimateSbgSbu] = useState(false); // For SBG/SBU box animation
// //   const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]); // For selected capabilities
// //   const router = useRouter();

// //   const sbgOptions = ['AERO', 'BA', 'IA', 'ESS'];
// //   const sbuOptions = {
// //     AERO: ['AERO'],
// //     BA: ['BA'],
// //     IA: ['IA', 'HPS', 'PPE'],
// //     ESS: ['UOP', 'ADM'],
// //   };

// //   const handleSbgChange = (event: SelectChangeEvent<keyof typeof sbuOptions | ''>) => {
// //     const selectedSbg = event.target.value as keyof typeof sbuOptions | '';
// //     setSbg(selectedSbg);
// //     setSbu('');
// //     setShowFeatures(false); // Reset feature visibility on SBG change
// //     setAnimateFeatures(false); // Reset feature animation
// //     setAnimateSbgSbu(false); // Reset SBG/SBU box animation
// //   };

// //   const handleCapabilityChange = (capability: string) => {
// //     setSelectedCapabilities((prev) =>
// //       prev.includes(capability)
// //         ? prev.filter((item) => item !== capability)
// //         : [...prev, capability]
// //     );
// //   };

// //   const handleSubmit = () => {
// //     if (sbg && sbu) {
// //       setAnimateSbgSbu(true); // Trigger SBG/SBU box animation
// //       setTimeout(() => {
// //         setShowFeatures(true); // Show the feature list
// //         setTimeout(() => setAnimateFeatures(true), 50); // Trigger feature table animation
// //       }, 300); // Delay to allow SBG/SBU box animation to complete
// //     } else {
// //       alert('Please select both SBG and SBU before submitting.');
// //     }
// //   };

// //   const handleFinalSubmit = () => {
// //     if (selectedCapabilities.length === 0) {
// //       alert('Please select at least one capability.');
// //       return;
// //     }
// //     const query = selectedCapabilities
// //       .map((cap) => `capabilities=${encodeURIComponent(cap)}`)
// //       .join('&');
// //     router.push(`/result?${query}`);
// //   };

// //   return (
// //     <main
// //       style={{
// //         paddingTop: '2px',
// //         fontFamily: 'honeywell sans',
// //         backgroundColor: '#ffffff', // Set the overall screen color to white
// //         minHeight: '100vh',
// //         display: 'flex',
// //         flexDirection: 'column',
// //         alignItems: 'center',
// //         gap: '30px',
// //         position: 'relative',
// //         maxWidth: '1600px',
// //         margin: '0 auto',
// //       }}
// //     >
// //       {/* Header */}
// //       <Box
// //         style={{
// //           width: '100%',
// //           backgroundColor: '#ffffff',
// //           padding: '15px 30px',
// //           display: 'flex',
// //           alignItems: 'center',
// //           gap: '15px',
// //         }}
// //       >
// //         <img src="/header.png" alt="Logo" style={{ width: '220px', height: '40px',  cursor: 'pointer' }} onClick={() => window.location.reload()} />
// //         <div style={{ width: '2px', height: '50px', backgroundColor: '#cccccc' }}></div>
// //         <Typography
// //           variant="h6"
// //           style={{ fontWeight: 'lighter', color: '#6a6a6a' }}
// //         >
// //           COST ESTIMATION TOOL
// //         </Typography>
// //       </Box>

// //       <Divider
// //       style={{
// //         width: '100%',
// //         borderColor: '#cccccc', // Light gray color for the divider
// //         marginBottom: '10px',// Remove any margin to ensure it's directly below the header
// //       }}
// //     />

// //       {/* Main content */}
// //       <Box
// //         display="flex"
// //         flexDirection="row"
// //         gap="24px"
// //         justifyContent="center"
// //         flexWrap="wrap"
// //         width="100%"
// //         maxWidth="1600px"
// //         paddingX="16px"
// //         alignItems="flex-start"
// //       >
// //         {/* SBG/SBU Box */}
// //         <Paper
// //           elevation={3}
// //           style={{
// //             width: '100%',
// //             maxWidth: '480px',
// //             padding: '24px',
// //             borderRadius: '12px',
// //             backgroundColor: '#ffffff',
// //             boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.07)', // Retain the shadow
// //             border: '1px solid #e0e0e0', // Light border around the boX
// //             flexShrink: 0,
// //             transform: animateSbgSbu ? 'translateX(-10px)' : 'translateX(0)', // Subtle left shift
// //             transition: 'transform 0.5s ease-in-out', // Smooth and fast transition
// //           }}
// //         >
// //           <Typography
// //             variant="h5"
// //             style={{
// //               marginBottom: '20px',
// //               color: '#333',
// //               fontFamily: 'honeywell sans',
// //               fontSize: '18px',
// //             }}
// //           >
// //             Select Business Group & Unit
// //           </Typography>

// //           <Box
// //             display="flex"
// //             flexDirection={showFeatures ? 'column' : 'row'}
// //             gap="16px"
// //             flexWrap="wrap"
// //           >
// //             <FormControl fullWidth>
// //               <InputLabel>SBG</InputLabel>
// //               <Select
// //                 value={sbg}
// //                 onChange={handleSbgChange}
// //                 label="SBG"
// //                 style={{
// //                   backgroundColor: '#f4f6f8',
// //                   borderRadius: '8px',
// //                 }}
// //               >
// //                 <MenuItem value="">-- Select SBG --</MenuItem>
// //                 {sbgOptions.map((option) => (
// //                   <MenuItem key={option} value={option}>
// //                     {option}
// //                   </MenuItem>
// //                 ))}
// //               </Select>
// //             </FormControl>

// //             <FormControl fullWidth disabled={!sbg}>
// //               <InputLabel>SBU</InputLabel>
// //               <Select
// //                 value={sbu}
// //                 onChange={(event) => setSbu(event.target.value)}
// //                 label="SBU"
// //                 style={{
// //                   backgroundColor: sbg ? '#f4f6f8' : '#e0e0e0',
// //                   borderRadius: '8px',
// //                 }}
// //               >
// //                 <MenuItem value="">-- Select SBU --</MenuItem>
// //                 {sbg &&
// //                   sbuOptions[sbg]?.map((option) => (
// //                     <MenuItem key={option} value={option}>
// //                       {option}
// //                     </MenuItem>
// //                   ))}
// //               </Select>
// //             </FormControl>
// //           </Box>

// //           <Box display="flex" justifyContent="center" marginTop="20px">
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               onClick={handleSubmit}
// //               style={{
// //                 backgroundColor: '#007bff',
// //                 color: '#ffffff',
// //                 textTransform: 'none',
// //                 borderRadius: '8px',
// //               }}
// //             >
// //               Submit
// //             </Button>
// //           </Box>
// //         </Paper>

// //         {/* Feature Selector Box */}
// //       {showFeatures && (
// //         <Box
// //           style={{
// //             maxWidth: '500px', // Reduced the width of the box
// //             width: '100%',
// //             padding: '14px', // Padding for the outer box
// //             borderRadius: '12px',
// //             backgroundColor: '#ffffff',
// //             fontFamily: 'honeywell sans',
// //             boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.07)', // Retain the shadow
// //             border: '1px solid #e0e0e0', // Retain the shadow for the feature box
// //             flexGrow: 1,
// //             opacity: animateFeatures ? 1 : 0, // Fade-in effect
// //             transform: animateFeatures ? 'translateY(0)' : 'translateY(20px)', // Slide-in effect
// //             transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out', // Smooth and fast transition
// //           }}
// //         >
// //     <Typography
// //       variant="h5"
// //       gutterBottom
// //       sx={{
// //         textAlign: 'center',
// //         color: '#333',
// //         fontFamily: 'honeywell sans',
// //         marginBottom: '0px', 
// //       }}
// //     >
// //       Select Features/Capabilities
// //     </Typography>

    
// //     <Box
// //       style={{
// //         backgroundColor: '#f4f6f8', 
// //         borderRadius: '8px',
// //         paddingLeft: '30px', 
// //         padding: '16px', 
// //         margin: '20px', 
// //       }}
// //     >
// //       <FormGroup>
// //         {allCapabilities.map((cap) => (
// //           <FormControlLabel
// //             key={cap}
// //             control={
// //               <Checkbox
// //                 checked={selectedCapabilities.includes(cap)}
// //                 onChange={() => handleCapabilityChange(cap)}
// //                 sx={{
// //                   color: '#7f7f7f',
// //                   '&.Mui-checked': {
// //                     color: '#258df5',
// //                   },
// //                 }}
// //               />
// //             }
// //             label={cap}
// //           />
// //         ))}
// //       </FormGroup>
// //     </Box>

// //     {/* Submit Button */}
// //     <Box display="flex" justifyContent="center" marginTop="12px">
// //       <Button
// //         variant="contained"
// //         color="primary"
// //         onClick={handleFinalSubmit}
// //         style={{
// //           backgroundColor: '#007bff',
// //           color: '#ffffff',
// //           textTransform: 'none',
// //           borderRadius: '8px',
// //         }}
// //       >
// //           Submit
// //         </Button>
// //       </Box>
// //     </Box>
// //   )}
// // </Box>

// //       {/* Footer */}
// //       <img
// //         src="/footer.png"
// //         alt="Footer Image"
// //         style={{
// //           width: '150%',
// //           height: '650px',
// //           display: 'block',
// //         }}
// //       />
// //     </main>
// //   );
// // }




// // 'use client';

// // import { useState } from 'react';
// // import {
// //   MenuItem,
// //   Select,
// //   FormControl,
// //   InputLabel,
// //   Typography,
// //   Divider,
// //   Button,
// //   Checkbox,
// //   FormControlLabel,
// //   FormGroup,
// //   SelectChangeEvent,
// // } from '@mui/material';
// // import { useRouter } from 'next/navigation';

// // const allCapabilities = [
// //   'Account Management',
// //   'Integrated Journey',
// //   'Case Management',
// //   'Technical Solutions',
// //   'Order Status',
// //   'Technical Publications',
// //   'Software Downloads',
// //   'Software Upload',
// //   'Invoice Management',
// //   'Subscription Management',
// // ];

// // export default function HomePage() {
// //   const [sbg, setSbg] = useState<keyof typeof sbuOptions | ''>('');
// //   const [sbu, setSbu] = useState('');
// //   const [showFeatures, setShowFeatures] = useState(false);
// //   const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
// //   const [animateFeatures, setAnimateFeatures] = useState(false); // For feature table animation
// //   const [animateSbgSbu, setAnimateSbgSbu] = useState(false); // For SBG/SBU box animation
// //   const router = useRouter();

// //   const sbgOptions = ['AERO', 'BA', 'IA', 'ESS'];
// //   const sbuOptions = {
// //     AERO: ['AERO'],
// //     BA: ['BA'],
// //     IA: ['IA', 'HPS', 'PPE'],
// //     ESS: ['UOP', 'ADM'],
// //   };

// //   const handleSbgChange = (event: SelectChangeEvent<keyof typeof sbuOptions | ''>) => {
// //     const selectedSbg = event.target.value as keyof typeof sbuOptions | '';
// //     setSbg(selectedSbg);
// //     setSbu('');
// //     setShowFeatures(false);
// //     setAnimateFeatures(false); // Reset feature animation
// //     setAnimateSbgSbu(false); // Reset SBG/SBU box animation
// //   };

// //   const handleCapabilityChange = (capability: string) => {
// //     setSelectedCapabilities((prev) =>
// //       prev.includes(capability)
// //         ? prev.filter((item) => item !== capability)
// //         : [...prev, capability]
// //     );
// //   };

// //   const handleSubmit = () => {
// //     if (sbg && sbu) {
// //       setAnimateSbgSbu(true); // Trigger SBG/SBU box animation
// //       setTimeout(() => {
// //         setShowFeatures(true); // Show the feature list
// //         setTimeout(() => setAnimateFeatures(true), 50); // Trigger feature table animation
// //       }, 300); // Delay to allow SBG/SBU box animation to complete
// //     } else {
// //       alert('Please select both SBG and SBU before submitting.');
// //     }
// //   };

// //   const handleFinalSubmit = () => {
// //     if (selectedCapabilities.length === 0) {
// //       alert('Please select at least one capability.');
// //       return;
// //     }
// //     const query = selectedCapabilities
// //       .map((cap) => `capabilities=${encodeURIComponent(cap)}`)
// //       .join('&');
// //     router.push(`/result?${query}`);
// //   };

// //   return (
// //     <main
// //     style={{
// //       paddingTop: '12px',
// //       paddingBottom: '20px',
// //       fontFamily: 'honeywell sans',
// //       backgroundColor: '#ffffff',
// //       minHeight: '100vh',
// //       display: 'flex',
// //       flexDirection: 'column',
// //       alignItems: 'center',
// //       gap: '5px', // Reduced gap between elements
// //       maxWidth: '1600px',
// //       margin: '0 auto',
// //     }}
// // >
// //   {/* Header */}
// //   <div
// //     style={{
// //       width: '100%',
// //       backgroundColor: '#ffffff',
// //       padding: '20px 30px',
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '15px',
// //     }}
// //   >
// //     <img
// //       src="/header.png"
// //       alt="Logo"
// //       style={{ width: '220px', height: '43px', cursor: 'pointer' }}
// //       onClick={() => window.location.reload()}
// //     />
// //     <div style={{ width: '2px', height: '40px', backgroundColor: '#cccccc' }}></div>
// //     <Typography
// //       variant="h6"
// //       style={{ fontWeight: 'lighter', color: '#6a6a6a' }}
// //     >
// //       COST ESTIMATION TOOL
// //     </Typography>
// //   </div>

// //   {/* Divider */}
// //   <Divider
// //     style={{
// //       width: '100%',
// //       borderColor: '#cccccc',
// //       marginBottom: '0px', // Removed extra space below the divider
// //     }}
// //   />

// //   {/* Main content */}
// //   <div
// //     style={{
// //       display: 'flex',
// //       flexDirection: 'row', // Ensure the boxes are side by side
// //       gap: '24px',
// //       justifyContent: 'center',
// //       flexWrap: 'wrap',
// //       width: '100%',
// //       maxWidth: '1600px',
// //       padding: '16px',
// //       alignItems: 'flex-start',
// //     }}
// //   >

// //     {/* SBG/SBU Section */}
// //     <div
// //     style={{
// //     width: '100%',
// //     maxWidth: '480px',
// //     padding: '24px',
// //     transform: animateSbgSbu ? 'translateX(-10px)' : 'translateX(0)', // Left transition
// //     transition: 'transform 0.1s linear', // Faster and snappier transition
// //     }}
// //   >
// //       <Typography
// //         variant="h5"
// //         style={{
// //           marginBottom: '20px',
// //           color: '#333',
// //           fontFamily: 'honeywell sans',
// //           fontSize: '20px',
// //         }}
// //       >
// //         Select Business Group & Unit
// //       </Typography>

// //       <div
// //         style={{
// //           display: 'flex',
// //           flexDirection: 'row',
// //           gap: '16px',
// //           flexWrap: 'wrap',
// //         }}
// //       >
// //     <FormControl fullWidth>
// //       <InputLabel>SBG</InputLabel>
// //       <Select
// //         value={sbg}
// //         onChange={handleSbgChange}
// //         label="SBG"
// //         style={{
// //           backgroundColor: '#f4f6f8',
// //           borderRadius: '8px',
// //         }}
// //       >
// //         <MenuItem value="">-- Select SBG --</MenuItem>
// //         {sbgOptions.map((option) => (
// //           <MenuItem key={option} value={option}>
// //             {option}
// //           </MenuItem>
// //         ))}
// //       </Select>
// //     </FormControl>

// //     <FormControl fullWidth disabled={!sbg}>
// //       <InputLabel>SBU</InputLabel>
// //       <Select
// //         value={sbu}
// //         onChange={(event) => setSbu(event.target.value)}
// //         label="SBU"
// //         style={{
// //           backgroundColor: sbg ? '#f4f6f8' : '#e0e0e0',
// //           borderRadius: '8px',
// //         }}
// //       >
// //         <MenuItem value="">-- Select SBU --</MenuItem>
// //         {sbg &&
// //           sbuOptions[sbg]?.map((option) => (
// //             <MenuItem key={option} value={option}>
// //               {option}
// //             </MenuItem>
// //           ))}
// //       </Select>
// //     </FormControl>
// //   </div>

// //   <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
// //     <Button
// //       variant="contained"
// //       color="primary"
// //       onClick={handleSubmit}
// //       style={{
// //         backgroundColor: '#007bff',
// //         color: '#ffffff',
// //         textTransform: 'none',
// //         borderRadius: '8px',
// //       }}
// //     >
// //       Submit
// //     </Button>
// //   </div>
// // </div>

// // {/* Feature Selector Section */}
// // {showFeatures && (
// //   <div
// //     style={{
// //       width: '100%',
// //       maxWidth: '530px',
// //       padding: '24px',
// //       paddingLeft: '20px',
// //       opacity: animateFeatures ? 1 : 0, // Fade-in effect
// //       transform: animateFeatures ? 'translateY(0)' : 'translateY(20px)', // Slide-in effect
// //       transition: 'opacity 0.5s linear, transform 0.5s linear', // Synchronized transition duration and easing
// //     }}
// //   >
// //     <Typography
// //       variant="h5"
// //       style={{
// //         marginBottom: '16px',
// //         color: '#333',
// //         fontFamily: 'honeywell sans',
// //         fontSize: '20px',
// //         paddingLeft: '8px',
// //       }}
// //     >
// //       Select Features/Capabilities
// //     </Typography>

// //     <div
// //       style={{
// //         backgroundColor: '#f4f6f8',
// //         borderRadius: '8px',
// //         padding: '20px',
// //         paddingLeft: '30px',
// //         width: '80%',
// //         color: '#333',
// //         fontFamily: 'honeywell sans',
// //       }}
// //     >
// //       <FormGroup>
// //         {allCapabilities.map((cap) => (
// //           <FormControlLabel
// //             key={cap}
// //             control={
// //               <Checkbox
// //                 checked={selectedCapabilities.includes(cap)}
// //                 onChange={() => handleCapabilityChange(cap)}
// //                 sx={{
// //                   color: '#7f7f7f',
// //                   '&.Mui-checked': {
// //                     color: '#258df5',
// //                   },
// //                 }}
// //               />
// //             }
// //             label={cap}
// //           />
// //         ))}
// //       </FormGroup>
// //     </div>

// //     {/* Centered Submit Button */}
// //     <div
// //       style={{
// //         display: 'flex',
// //         justifyContent: 'center', // Center the button horizontally
// //         marginTop: '20px',
// //       }}
// //     >
// //       <Button
// //         variant="contained"
// //         color="primary"
// //         onClick={handleFinalSubmit}
// //         style={{
// //           backgroundColor: '#007bff',
// //           color: '#ffffff',
// //           textTransform: 'none',
// //           borderRadius: '8px',
// //           marginRight: '105px', // Center the button
// //         }}
// //       >
// //         Submit
// //       </Button>
// //     </div>
// //   </div>
// // )}

// //   </div>

// //   {/* Footer */}
// //   <img
// //     src="/footer.png"
// //     alt="Footer Image"
// //     style={{
// //       width: '150%',
// //       height: '650px',
// //       display: 'block',
// //     }}
// //   />
// //   </main>
// //   );
// // }



'use client'; 
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useRef, useEffect } from 'react';
import { allCapabilities, rawTableData, headerColumns } from '../public/data';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Divider,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import * as ExcelJS from 'exceljs';

const exportToExcel = async (filteredTableData: any[]) => {
  if (!filteredTableData || filteredTableData.length === 0) {
    alert('No data to export.');
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Selected Features Data');

  // Add headers
  worksheet.addRow(headerColumns);

  // Style the header row (blue background, white text, bold)
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '0071B3' },
    };
    cell.font = {
      color: { argb: 'FFFFFF' },
      bold: true,
    };
  });
  headerRow.height = 30; // Set header row height
  headerRow.eachCell((cell) => {
    cell.alignment = { vertical: 'middle', horizontal: 'center' }; // Center align header text
  });
  headerColumns.forEach((_, index) => {
    worksheet.getColumn(index + 1).width = 25; // Set column width
    worksheet.getColumn(index + 1).alignment = { vertical: 'middle', horizontal: 'center' }; // Center align column text
  });
  worksheet.getColumn(4).width = 68; //tech stack width

  // Add data rows
  filteredTableData.forEach((row) => {
    const rowData = headerColumns.map((column) => row[column]);
    const dataRow = worksheet.addRow(rowData);
    dataRow.height = 20; // Set data row height
  });

  const now = new Date();
  const formattedDateTime = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now
    .getHours()
    .toString()
    .padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;
  const filename = `selected_features_data_${formattedDateTime}.xlsx`;

  // Generate and download the Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(data);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(anchor);
};

const getType = (sbg: string, sbu: string, capability: string) => {
  // Mapping rules based on the screenshot you provided
  if (sbg === 'AERO') {
    if (sbu === 'AERO') {
      if ([
        'Software Downloads',
        'Software Upload',
        'Invoice Management',
        'Subscription Management'
      ].includes(capability)) return 'New Development';
      return 'Onboarding';
    }
    return 'Onboarding';
  }
  if (sbg === 'BA' && sbu === 'BA') {
    return 'Onboarding';
  }
  if (sbg === 'IA') {
    if (sbu === 'IA'){
      if ([
        'Software Downloads',
        'Software Upload',
        'Subscription Management'
      ].includes(capability)) return 'New Development';
      return 'Onboarding';
    }
    if (sbu === 'HPS') {
      if (capability === 'Subscription Management') return 'New Development';
      return 'Onboarding';
    }
    if (sbu === 'PPE') {
      if ([
        'Software Downloads',
        'Software Upload',
        'Invoice Management',
        'Subscription Management'
      ].includes(capability)) return 'New Development';
      return 'Onboarding';
    }
    return 'Onboarding';
  }
  if (sbg === 'ESS') {
    if (sbu === 'UOP' || sbu === 'ADM') {
      if ([
        'Technical Solutions',
        'Technical Publications',
        'Software Downloads',
        'Software Upload',
        'Invoice Management',
        'Subscription Management'
      ].includes(capability)) return 'New Development';
      return 'Onboarding';
    }
  }
  return 'Onboarding'; // Default case
};

export default function HomePage() {
  const [sbg, setSbg] = useState<keyof typeof sbuOptions | ''>('');
  const [sbu, setSbu] = useState('');
  const [showFeatures, setShowFeatures] = useState(false);
  const [animateFeatures, setAnimateFeatures] = useState(false);
  const [hasUserSelected, setHasUserSelected] = useState(false);
  const [isSbgSbuDisabled, setIsSbgSbuDisabled] = useState(false);
  const router = useRouter();
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [filteredTableData, setFilteredTableData] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);

  const sbgOptions = ['AERO', 'BA', 'IA', 'ESS'];
  const sbuOptions = {
    AERO: ['AERO'],
    BA: ['BA'],
    IA: ['IA', 'HPS', 'PPE'],
    ESS: ['UOP', 'ADM'],
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSbgChange = (event: SelectChangeEvent<keyof typeof sbuOptions | ''>) => {
    const selectedSbg = event.target.value as keyof typeof sbuOptions | '';
    setSbg(selectedSbg);
    setSbu('');
    setShowFeatures(false);
    setAnimateFeatures(false);
  };

  const handleSbuChange = (event: SelectChangeEvent<string>) => {
    setSbu(event.target.value);
  };

  const handleCapabilityChange = (capability: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(capability)
        ? prev.filter((item) => item !== capability)
        : [...prev, capability]
    );
  };

  const tableContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (filteredTableData.length > 0 && tableContainerRef.current) {
      tableContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [filteredTableData]);

  const handleSubmit = () => {
    if (sbg && sbu) {
      setHasUserSelected(true);
      setIsSbgSbuDisabled(true);
      setShowFeatures(true);
      setTimeout(() => setAnimateFeatures(true), 100);
    } else {
      alert('Please select both SBG and SBU before submitting.');
    }
  };

  const handleFinalSubmit = () => {
    if (selectedCapabilities.length === 0) {
      alert('Please select at least one capability.');
      return;
    }
    const filteredData = rawTableData
      .filter((item) => selectedCapabilities.includes(item.Capability))
      .map(item => ({
        ...item,
        Type: getType(sbg, sbu, item.Capability) // Add Type based on selection
      }));
    setFilteredTableData(filteredData);
  };

  return (
    <main
    style={{
      paddingTop: '12px',
      paddingBottom: '20px',
      fontFamily: 'honeywell sans',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px',
      maxWidth: '1600px',
      margin: '0 auto',
    }}
  >
      <div
        style={{
          width: '100%',
          height: '60px',
          backgroundColor: '#ffffff',
          padding: '20px 30px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <img
          src="/header.png"
          alt="Logo"
          style={{ width: '220px', height: '43px', cursor: 'pointer' }}
          onClick={() => window.location.reload()}
        />
        <div style={{ width: '2px', height: '40px', backgroundColor: '#cccccc' }}></div>
        <Typography
          variant="h6"
          style={{ fontWeight: 'lighter', color: '#6a6a6a' }}
        >
          COST ESTIMATION TOOL
        </Typography>
      </div>

      <Divider
        style={{
          width: '100%',
          borderColor: '#cccccc',
          marginBottom: '5px',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '1600px',
          padding: '16px',
          alignItems: 'flex-start',
          minHeight: '200px',
        }}
      >
        {/* SBG + SBU Box */}
        <div
          style={{
            width: '100%',
            maxWidth: '480px',
            padding: '24px',
            marginLeft: hasUserSelected ? '0' : 'auto',
            marginRight: hasUserSelected ? '0' : 'auto',
            transition: 'margin 0.3s ease-in-out', // Smooth transition
          }}
        >
          <Typography
            variant="h5"
            style={{
              marginBottom: '20px',
              color: '#333',
              fontFamily: 'honeywell sans',
              fontSize: '20px',
            }}
          >
            Select Business Group & Unit
          </Typography>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <FormControl fullWidth>
              <InputLabel>SBG</InputLabel>
              <Select
                value={sbg}
                onChange={handleSbgChange}
                label="SBG"
                disabled={isSbgSbuDisabled} // Disable the dropdown once selected
                style={{
                  backgroundColor: '#f4f6f8',
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="">-- Select SBG --</MenuItem>
                {sbgOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth disabled={!sbg || isSbgSbuDisabled}>
              <InputLabel>SBU</InputLabel>
              <Select
                value={sbu}
                onChange={(event) => setSbu(event.target.value)}
                label="SBU"
                disabled={isSbgSbuDisabled} // Disable the dropdown once selected
                style={{
                  backgroundColor: sbg ? '#f4f6f8' : '#e0e0e0',
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="">-- Select SBU --</MenuItem>
                {sbg &&
                  sbuOptions[sbg]?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          {/* Submit Button (Only visible when SBG and SBU are not selected) */}
          {!hasUserSelected && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#007bff',
                  color: '#ffffff',
                  textTransform: 'none',
                  borderRadius: '8px',
                }}
              >
                Submit
              </Button>
            </div>
          )}
        </div>

        {/* Feature Box */}
        {showFeatures && (
          <div
            style={{
              width: '100%',
              maxWidth: '530px',
              padding: '24px',
              paddingLeft: '20px',
              opacity: animateFeatures ? 1 : 0,
              transform: animateFeatures ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <Typography
              variant="h5"
              style={{
                marginBottom: '16px',
                color: '#333',
                fontFamily: 'honeywell sans',
                fontSize: '20px',
                paddingLeft: '8px',
              }}
            >
              Select Features/Capabilities
            </Typography>

            <div
              style={{
                backgroundColor: '#f4f6f8',
                borderRadius: '8px',
                padding: '20px',
                paddingLeft: '30px',
                width: '80%',
                color: '#333',
                fontFamily: 'honeywell sans',
              }}
            >
              <FormGroup>
                {allCapabilities.map((cap) => (
                  <FormControlLabel
                    key={cap}
                    control={
                      <Checkbox
                        checked={selectedCapabilities.includes(cap)}
                        onChange={() => handleCapabilityChange(cap)}
                        sx={{
                          color: '#7f7f7f',
                          '&.Mui-checked': {
                            color: '#258df5',
                          },
                        }}
                      />
                    }
                    label={cap}
                  />
                ))}
              </FormGroup>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleFinalSubmit}
                style={{
                  backgroundColor: '#007bff',
                  color: '#ffffff',
                  textTransform: 'none',
                  borderRadius: '8px',
                  marginRight: '105px',
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Display the filtered table in accordion view */}
      {filteredTableData.length > 0 && (
      <div 
        ref={tableContainerRef}
        style={{ width: '95%', margin: '20px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
    {filteredTableData.map((row, index) => (
      <Accordion
        key={index}
        expanded={expanded === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
        sx={{
          width: '100%',
          marginBottom: '8px',
          boxShadow: 'none',
          border: 'none',
          '&:before': {
            display: 'none',
          },
          borderBottom: '1px solid #cccccc',
        }}
      >

      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: '#ffffff' }} />} // Ensure the icon is white to match the header
        aria-controls={`panel${index}bh-content`}
        id={`panel${index}bh-header`}
        style={{ padding: 0 }}
      >
        <div style={{ width: '100%' }}>
          <Table style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <TableHead style={{ backgroundColor: '#0071b3' }}>
              <TableRow>
                <TableCell style={{ 
                  color: '#ffffff', 
                  fontWeight: 'bold', 
                  width: '25%',
                  border: 'none',
                }}>
                  Capability
                </TableCell>
                <TableCell style={{ 
                  color: '#ffffff', 
                  fontWeight: 'bold', 
                  width: '15%',
                  border: 'none'
                }}>
                  Type
                </TableCell>
                <TableCell style={{ 
                  color: '#ffffff', 
                  fontWeight: 'bold', 
                  width: '15%',
                  border: 'none'
                }}>
                  Sub-Total
                </TableCell>
                <TableCell style={{ 
                  color: '#ffffff', 
                  fontWeight: 'bold', 
                  width: '40%',
                  border: 'none'
                }}>
                  Technology Stack
                </TableCell>
                <TableCell style={{ 
                  color: '#ffffff', 
                  fontWeight: 'bold', 
                  width: '5%',
                  border: 'none',
                  textAlign: 'right', // Align the icon to the right
                }}>
                  <ExpandMoreIcon style={{ color: '#ffffff' }} /> {/* Moved icon here */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ 
                  fontWeight: 'bold', 
                  width: '25%',
                  border: 'none'
                }}>
                  {row.Capability}
                </TableCell>
                <TableCell style={{ 
                  width: '15%',
                  border: 'none'
                }}>
                  {row.Type}
                </TableCell>
                <TableCell style={{ 
                  width: '15%',
                  border: 'none'
                }}>
                  {row['Sub-Total']}
                </TableCell>
                <TableCell style={{ 
                  width: '30%',
                  border: 'none'
                }}>
                  {row['Technology Stack']}
                </TableCell>
                <TableCell style={{ 
                  width: '5%',
                  border: 'none',
                  textAlign: 'right', // Align the icon to the right
                }}>
                  {/* Empty cell for alignment */}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </AccordionSummary>

        <AccordionDetails style={{ padding: 0 }}>
          <div style={{ width: '98.5%' }}>
            <Table style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <TableHead style={{ backgroundColor: '#D3D3D3' }}>
                <TableRow>
                  {headerColumns.slice(4, -1).map((column) => ( // Changed from 3 to 4 to skip Technology Stack
                    <TableCell 
                      key={column} 
                      style={{ 
                        color: '#151515', 
                        fontWeight: 'bold',
                        border: 'none'
                      }}
                    >
                      {column}
                    </TableCell>
                  ))}
                  <TableCell style={{ 
                    color: '#151515', 
                    fontWeight: 'bold',
                    border: 'none'
                  }}>
                    {headerColumns[headerColumns.length - 1]}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {headerColumns.slice(4, -1).map((column) => ( // Changed from 3 to 4 to skip Technology Stack
                    <TableCell 
                      key={column}
                      style={{ border: 'none' }}
                    >
                      {row[column]}
                    </TableCell>
                  ))}
                  <TableCell style={{ border: 'none' }}>
                    {row[headerColumns[headerColumns.length - 1]]}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </AccordionDetails>
      </Accordion>
    ))}

        <Button
          variant="contained"
          color="primary"
          onClick={() => exportToExcel(filteredTableData)}
          style={{ marginTop: '16px', textTransform: 'none' }}
        >
          Export to Excel
        </Button>

        </div>
)}
        <img
        src="/footer.png"
        alt="Footer Image"
        style={{
          width: '150%',
          height: 'auto', // Adjusted height for responsiveness
          display: 'block',
          marginTop: '20px', // Added some top margin
        }}
      />
    </main>
  );
}