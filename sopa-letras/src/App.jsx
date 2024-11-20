// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portada from './layouts/Portada';
import Texto from './components/Texto';
import Ilustracion from './components/Ilustracion';
import Boton from './components/Boton';
import Instrucciones from './pages/Instrucciones';
import Fabula from './pages/Fabula';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Portada>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Texto content="La Liebre y la Tortuga" type="h1" />
                  <Texto content="Sopita de letras" type="p" />
                </div>
                <Ilustracion src="/img/imagen-portada.png" alt="Descripción de la imagen" />
              </div>
              <Boton text="Comenzar" color="green" route="/instrucciones" />
            </Portada>
          }
        />
        <Route path="/instrucciones" element={<Instrucciones />} />
        <Route path="/fabula" element={<Fabula />} />
    
      </Routes>
    </Router>
  );
}

export default App;