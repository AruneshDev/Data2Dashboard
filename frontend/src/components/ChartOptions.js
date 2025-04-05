import React from 'react';

function ChartOptions({ chartType, setChartType, xAxis, setXAxis, yAxis, setYAxis, columns }) {
  return (
    <div className="options-container">
      <label>Chart Type:</label>
      <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="select-box">
        <option value="bar">Bar</option>
        <option value="line">Line</option>
        <option value="scatter">Scatter</option>
        <option value="pie">Pie</option>
      </select>
      <label>X-Axis:</label>
      <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} className="select-box">
        <option value="">Select X-Axis</option>
        {columns.map((col, index) => (
          <option key={index} value={col}>{col}</option>
        ))}
      </select>
      <label>Y-Axis:</label>
      <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} className="select-box">
        <option value="">Select Y-Axis</option>
        {columns.map((col, index) => (
          <option key={index} value={col}>{col}</option>
        ))}
      </select>
    </div>
  );
}

export default ChartOptions;
