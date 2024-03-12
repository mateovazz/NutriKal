import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importo Bootstrap CSS
import { ToastContainer, toast } from 'react-toastify'; // Importo ToastContainer y toast
import 'react-toastify/dist/ReactToastify.css'; // Importo estilos de react-toastify

const Menu = () => {
    const navigate = useNavigate();

    const handleClick = (event) => {
        toast.warn("Cerrando sesion...", { autoClose: 1500 });
        setTimeout(() => {
            let localStorage = window.localStorage;
            localStorage.clear();
            navigate("/Home");
        }, 2153);
    }

    return (
        <>
            <ToastContainer position="top-center" />
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: "#ADBC9F", alignItems: "center" }}>
                <div className="container">
                    {!localStorage.getItem("token") ? (
                        <a className="navbar-brand" href="#/Home" style={{ fontSize: '40px' }}>NutriKal</a>
                    ) : (
                        <a className="navbar-brand" href="#/" style={{ fontSize: '40px' }}>NutriKal</a>
                    )}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {!localStorage.getItem("token") ? (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#/Login">Inicio de Sesión</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#/Registro">Registro</a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item ml-auto">
                                        <button onClick={handleClick} className="btn btn-outline-danger">Log out</button>
                                    </li>
                                </>)}
                        </ul>
                    </div>
                </div>
            </nav >
        </>
    );
}

export default Menu;