import React from 'react';

function Visualization({ imageUrl }) {
  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Visualization" style={{ marginTop: '20px', width: '80%', height: 'auto' }} />
      ) : (
        <p>No visualization to display</p>
      )}
    </div>
  );
}

export default Visualization;
