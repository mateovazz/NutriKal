import React, { useState, useEffect } from 'react';
import { loginObligatorio } from '../Services/service';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importo Bootstrap CSS
import { ToastContainer, toast } from 'react-toastify'; // Importo ToastContainer y toast
import 'react-toastify/dist/ReactToastify.css'; // Importo estilos de react-toastify
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';
import Menu from './Menu';

const InicioSesion = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [disableButton, setDisableButton] = useState(true); // Estado para deshabilitar el botón de inicio de sesión

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        // Verifica si alguno de los campos está vacío y actualiza el estado de disableButton
        if (username.trim() === '' || password.trim() === '') {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }, [username, password]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        loginObligatorio(username, password)
            .then(({ error, result }) => {
                if (error) {
                    toast.error(result.mensaje, { autoClose: 3000 });
                } else {
                    toast.success("Iniciando sesion...", { autoClose: 1500 });
                    setTimeout(() => {
                        localStorage.setItem('token', result.apiKey);
                        localStorage.setItem('id', result.id);
                        localStorage.setItem('calorias', result.caloriasDiarias);
                        navigate("/");
                    }, 2153);
                }
            })
            .catch(error => {
                toast.error(error.message, { autoClose: 3000 });
            });
    };


    return (
        <>
            <ToastContainer position="top-center" />
            <Menu />
            <div id='inicioSesion'>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <h1>Inicie Sesión</h1>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button onClick={handleLogin} className="btn btn-success btn-rounded" disabled={disableButton}>Iniciar sesión</button>
                    <a className="btn btn-link" href="/Registro" role="button">No tienes cuenta?</a>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default InicioSesion;
