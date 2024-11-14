// src/components/Boton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Boton = ({ text, color = 'blue', route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <button
      style={{
        backgroundColor: color,
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Boton;