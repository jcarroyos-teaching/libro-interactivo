// src/layouts/Portada.jsx
import React from 'react';

const Portada = ({ children }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {children}
    </div>
  );
};

export default Portada;