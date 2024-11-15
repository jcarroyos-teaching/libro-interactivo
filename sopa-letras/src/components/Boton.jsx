import React from 'react';
import { useNavigate } from 'react-router-dom';

const Boton = ({ text, color = 'blue', route, onClick, visible = true }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (route) {
      navigate(route);
    }
  };

  if (!visible) {
    return null;
  }

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