// src/components/Texto.jsx
import React from 'react';

const Texto = ({ content, type = 'p' }) => {
  const Tag = type;

  return (
    <Tag style={{ fontSize: type === 'h1' ? '32px' : '18px', color: '#333' }}>
      {content}
    </Tag>
  );
};

export default Texto;