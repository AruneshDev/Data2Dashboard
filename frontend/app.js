import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [visualization, setVisualization] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("http://localhost:8000/upload", formData);
      setMessage(response.data.message);
    } catch (err) {
      setMessage("Upload failed: " + err.message);
    }
  };

  const handleVisualization = async (chartType, xAxis, yAxis) => {
    try {
      const response = await axios.post("http://localhost:8000/visualize", {
        chart_type: chartType,
        x_axis: xAxis,
        y_axis: yAxis,
      });
      setVisualization(response.data.filepath);
    } catch (err) {
      setMessage("Visualization failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Data to Dashboard</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>

      <div style={{ marginTop: '20px' }}>
        <h3>Create Visualization</h3>
        <button onClick={() => handleVisualization("bar", "column1", "column2")}>Bar Chart</button>
        <button onClick={() => handleVisualization("line", "column1", "column2")}>Line Chart</button>
        <button onClick={() => handleVisualization("scatter", "column1", "column2")}>Scatter Plot</button>
      </div>

      {visualization && (
        <div style={{ marginTop: '20px' }}>
          <h3>Visualization</h3>
          <img src={`http://localhost:8000/${visualization}`} alt="Visualization" />
        </div>
      )}
    </div>
  );
}

export default App;
