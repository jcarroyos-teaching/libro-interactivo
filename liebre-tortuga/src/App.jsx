// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portada from './layouts/Portada';
import Texto from './components/Texto';
import Ilustracion from './components/Ilustracion';
import Boton from './components/Boton';
import Instrucciones from './pages/Instrucciones';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Portada>
              <Texto content="Este es un título" type="h1" />
              <Texto content="Este es un párrafo" type="p" />
              <Ilustracion src="src/assets/imagen-portada.png" alt="Descripción de la imagen" />
              <Boton text="Comenzar" color="green" route="/instrucciones" />
            </Portada>
          }
        />
        <Route path="/instrucciones" element={<Instrucciones />} />
    
      </Routes>
    </Router>
  );
}

export default App;