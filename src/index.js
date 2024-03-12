import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux";
import { store } from './Redux/store';
import { createHashRouter, RouterProvider } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Rutas from './Routes/Rutas';

import InicioSesion from './Components/InicioSesion';
import Registro from './Components/Registro';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';

const router = createHashRouter([
  {
    path: '/Home',
    element: <Home />
  },
  {
    path: '/Login',
    element: <InicioSesion />
  },
  {
    path: '/Registro',
    element: <Registro />
  },
  {
    path: '/',
    element: <Dashboard />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <RouterProvider router={router} />

    {/* <Rutas></Rutas> */}

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
