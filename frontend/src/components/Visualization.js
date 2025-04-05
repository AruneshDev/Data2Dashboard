import React from 'react';

function Visualization({ imageUrl, loading }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'visualization.png';
    link.click();
  };

  return (
    <div className="visualization-container">
      {loading ? (
        <p>Loading visualization...</p>
      ) : imageUrl ? (
        <div className="visualization-wrapper">
          <h3>Generated Visualization</h3>
          <img 
            src={imageUrl} 
            alt="Visualization" 
            className="visualization-image" 
          />
          <button className="download-button" onClick={handleDownload}>
            Download Chart
          </button>
        </div>
      ) : (
        <p>No visualization to display</p>
      )}
    </div>
  );
}

export default Visualization;
