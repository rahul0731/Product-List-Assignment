import React, { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';
import TableListing from './components/TableListing'
import SearchBox from './components/SearchBox';
import axios from 'axios';
const App = () => {
  const [productsDetails, setProductDetails] = useState([]);
  const dataFetchedRef = useRef(false);
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const fetchData = async () => {
    let res = await axios.get(`https://dummyjson.com/products`);
    setProductDetails(res.data)
  }
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, [])
  const handleChange = async (value) => {
    let res = await axios.get(`https://dummyjson.com/products/search?q=${value}`);
    setProductDetails(res.data)

  };
  const optimizedFn = useCallback(debounce(handleChange), []);
  return (
    <div className="App">
      <SearchBox optimizedFn={optimizedFn} />
      <TableListing productsDetails={productsDetails} />
    </div>
  );
}

export default App;
