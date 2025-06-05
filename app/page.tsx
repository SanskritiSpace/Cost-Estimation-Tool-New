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
import Image from 'next/image';
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

  // const handleSbuChange = (event: SelectChangeEvent<string>) => {
  //   setSbu(event.target.value);
  // };

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
        <Image
          src="/header.png"
          alt="Logo"
          width={220} // Specify the width explicitly
          height={43} // Specify the height explicitly
          style={{ cursor: 'pointer' }}
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
        <Image
        src="/footer.png"
        alt="Footer Image"
        width={2000} // Specify the width explicitly
        height={500} // Specify the height explicitly
        style={{
          display: 'block',
          marginTop: '20px',
        }}
      />
    </main>
  );
}