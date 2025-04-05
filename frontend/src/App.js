import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [columns, setColumns] = useState([]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Upload file to get columns
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:8000/upload", formData);
      setColumns(response.data.columns);
      console.log("Columns:", response.data.columns);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleVisualization = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("chart_type", chartType);
    formData.append("x_axis", xAxis);
    formData.append("y_axis", yAxis);

    try {
      const response = await axios.post("http://localhost:8000/visualize", formData, {
        responseType: 'blob'
      });

      const imageBlob = new Blob([response.data], { type: 'image/png' });
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageObjectUrl);
    } catch (error) {
      console.error("Error generating visualization:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Data to Dashboard</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <label>Chart Type:</label>
      <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
        <option value="bar">Bar</option>
        <option value="line">Line</option>
        <option value="scatter">Scatter</option>
      </select>
      <br />
      <label>X-Axis:</label>
      <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
        <option value="">Select X-Axis</option>
        {columns.map((col, index) => (
          <option key={index} value={col}>{col}</option>
        ))}
      </select>
      <br />
      <label>Y-Axis:</label>
      <select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
        <option value="">Select Y-Axis</option>
        {columns.map((col, index) => (
          <option key={index} value={col}>{col}</option>
        ))}
      </select>
      <br />
      <button onClick={handleVisualization}>Generate Visualization</button>
      <br />
      {imageUrl && <img src={imageUrl} alt="Visualization" style={{ marginTop: '20px', width: '80%', height: 'auto' }} />}
    </div>
  );
}

export default App;
