// src/components/Ilustracion.jsx
import React from 'react';

const Ilustracion = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto' }} />
  );
};

export default Ilustracion;