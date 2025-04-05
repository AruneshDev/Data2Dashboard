import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import VisualizationPage from './pages/Visualization.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="content">
          <Sidebar />
          <div className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/visualize" element={<VisualizationPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
