import './App.css';
import Navbar from './components/navbar';
import React, { useRef, useState } from 'react';
import SliderRaffle from './components/sliderRaffle';
import AllRaffles from './components/allRaffles';

function App() {
  return (
    
    <>
      <Navbar/>
      <SliderRaffle/>
      <AllRaffles/>
    </>
  );
}

export default App;
