import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Addscenario from './pages/Addscenario';
import Allscenarios from './pages/Allscenarios';
import Addvehicle from './pages/Addvehicle';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addscenario" element={<Addscenario/>} />
          <Route path="/allscenarios" element={<Allscenarios/>} />
          <Route path="/addvehicle" element={<Addvehicle/>} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
