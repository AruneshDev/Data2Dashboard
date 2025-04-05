import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from '../components/FileUpload';
import ChartOptions from '../components/ChartOptions';
import Visualization from '../components/Visualization';

function VisualizationPage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:8000/upload", formData);
      setColumns(response.data.columns);
    } catch (error) {
      setErrorMessage("Failed to upload file. Please try again.");
    }
  };

  const handleVisualization = async () => {
    setLoading(true);
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
    } catch {
      setErrorMessage("Error generating visualization.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Visualization</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <FileUpload handleFileChange={handleFileChange} />
      <ChartOptions 
        chartType={chartType} setChartType={setChartType} 
        xAxis={xAxis} setXAxis={setXAxis} 
        yAxis={yAxis} setYAxis={setYAxis} 
        columns={columns} 
      />
      <button onClick={handleVisualization}>
        {loading ? "Generating..." : "Generate Visualization"}
      </button>
      {imageUrl && <Visualization imageUrl={imageUrl} />}
    </div>
  );
}

export default VisualizationPage;
