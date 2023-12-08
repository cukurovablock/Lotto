import './App.css';
import Navbar from './components/navbar';
import React, { useRef, useState } from 'react';
import SliderRaffle from './components/sliderRaffle';
import AllRaffles from './components/allRaffles';
import TableRaffle from './components/tableRaffle';
import Footer from './components/footer';

function App() {
  return (
    
    <>
      <Navbar/>
      <SliderRaffle/>
      <AllRaffles/>
      <TableRaffle/>
      <Footer/>
    </>
  );
}

export default App;
