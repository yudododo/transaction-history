import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TextField, Button, Grid } from '@mui/material';

import SwapVertIcon from '@mui/icons-material/SwapVert';
import data from './data.json'

const TransactionHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByPriceAsc, setSortByPriceAsc] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    let filteredResult = [...data]; 
    filteredResult = filteredResult.filter(transaction =>
      (!startDate || transaction.date >= startDate) &&
      (!endDate || transaction.date <= endDate) &&
      (transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.seller.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    filteredResult.sort((a, b) => {
      if (sortByPriceAsc) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredData(filteredResult);
  }, [startDate, endDate, searchTerm, sortByPriceAsc]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortByPrice = () => {
    setSortByPriceAsc(!sortByPriceAsc);
  };

  const handleSortById = () => {
    const sortedResult = [...filteredData].sort((a, b) => a.id - b.id);
    setFilteredData(sortedResult);
  };
  
  const handleSortByDate = () => {
    setFilteredData(prevData => {
      const sortedResult = [...prevData].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });
      return sortedResult;
    });
  };
  
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={4}>
        <TextField
          label="From"
          type="date"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={startDate}
          onChange={handleStartDateChange}/>
        </Grid>
        <Grid item md={4}>
          <TextField
            label="To"
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={handleEndDateChange}/>
        </Grid>
        <Grid item md={4}>

        <TextField
          label="Search"
          variant="outlined"
          onChange={handleSearch}/>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell><Button variant="text"  onClick={handleSortById}> Id </Button></TableCell>
            <TableCell><Button variant="text"  onClick={handleSortByDate}> Date </Button></TableCell>
            <TableCell>Buyer</TableCell>
            <TableCell>Seller</TableCell>
            <TableCell><Button variant="text"  startIcon={<SwapVertIcon/>} onClick={handleSortByPrice}>
          {sortByPriceAsc ? 'Sort by decreasing price' : 'Sort by increasing price'}</Button></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.buyer}</TableCell>
              <TableCell>{row.seller}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionHistoryPage;
