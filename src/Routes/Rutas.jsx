import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioSesion from '../Components/InicioSesion';
import Registro from '../Components/Registro';
import Dashboard from '../Components/Dashboard';
import Home from '../Components/Home';

const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<p>NO SE HALLÓ</p>}></Route>
                <Route path="/Login" element={<InicioSesion />}></Route>
                <Route path="/Registro" element={<Registro />}></Route>
                <Route path="/Home" element={<Home />}></Route>
                <Route path="/" element={<Dashboard />}></Route>
                {/* <Route path="/" element={<Dashboard />}>
                    <Route index element={<Home />} />
                    <Route path="tarjetas" element={<Tarjetas />}>
                        <Route path=":tareaId" element={<Tarea />} />
                        <Route path="nueva" element={<NuevaTarea />} />
                        <Route index element={<MenuTareas />} />
                    </Route>

                </Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default Rutas