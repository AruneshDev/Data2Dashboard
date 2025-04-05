import React from 'react';

function FileUpload({ handleFileChange }) {
  return (
    <div>
      <h3>Upload CSV File:</h3>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default FileUpload;
