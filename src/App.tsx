import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import TransitionWrapper from './components/TrasisionWrapper/TransitionWrapper';
import { HomeApp } from './components/home/home';



function App() {
  return (
    <Routes>
      <Route path='/' element={<TransitionWrapper/>}></Route>
      <Route path='/home' element={<HomeApp/>}></Route>
    </Routes>
  );
}

export default App;
