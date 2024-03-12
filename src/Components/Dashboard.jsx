import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./Menu";
import AgregarAlimento from "./AgregarAlimento";
import ListadoRegistros from "./ListadoRegistros";
import CaloriasTotales from "./CaloriasTotales";
import CaloriasDiarias from "./CaloriasDiarias";
import Footer from "./Footer";
import FotoTexto from "./FotoTexto";
import MapaUsuarios from "./MapaUsuarios";
import CuentaRegresiva from "./CuentaRegresiva";
import GraficaCantidadesPorAlimento from "./GraficaCantidadesPorAlimento";
import GraficoCaloriasPorFecha from "./GraficaCaloriasPorFecha";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const dato = localStorage.getItem("token");
    const lastPath = localStorage.getItem("lastPath");
    const isFirstVisit = localStorage.getItem("isFirstVisit");
    if (dato) {
      if (lastPath === "/Registro" || lastPath === "/Login") {
        if (!isFirstVisit) {
          // Si no es la primera visita, mostrar el toast
          toast.warn("No puedes acceder en este momento.", { autoClose: 3000 });
        } else {
          // Si es la primera visita, marcar como visitado
          localStorage.setItem("isFirstVisit", false);
        }
      }
    } else {
      //navegar al login
      navigate("/Home");
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />
      <Menu />
      <div id="fondo">
        <div className="container">
          <div className="row">
            <FotoTexto />
          </div>
          <div className="row mt-4">
            <CuentaRegresiva />
          </div>
          <div className="row mt-4">
            <AgregarAlimento />
            <div className="col-md-6">
              <div className="row mt-4">
                <CaloriasTotales />
              </div>
              <div className="row mt-4">
                <CaloriasDiarias />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <ListadoRegistros />
          </div>
          <div className="row mt-4">
            <MapaUsuarios />
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <GraficaCantidadesPorAlimento />
            </div>
            <div className="col-md-6">
              <GraficoCaloriasPorFecha />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
