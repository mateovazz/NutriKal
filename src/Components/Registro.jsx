import React, { useState, useEffect } from 'react';
import { obtenerPaises, registroObligatorio } from '../Services/service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';
import Menu from './Menu';

const Registro = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [idPais, setIdPais] = useState('');
    const [paises, setPaises] = useState([]);
    const [calorias, setCalorias] = useState('');

    useEffect(() => {

        const token = localStorage.getItem("token");
        const currentPath = window.location.pathname;

        if (token) {
            localStorage.setItem('lastPath', currentPath);
            navigate("/");
        } else {
            const fetchData = async () => {
                const paisesData = await obtenerPaises();
                setPaises(paisesData);
            };

            fetchData();
        }
    }, [navigate]);

    useEffect(() => {
        console.log(paises); // Verificar si paises se actualiza correctamente
    }, [paises]);

    const handlePaisChange = (event) => {
        setIdPais(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleCaloriasChange = (event) => {
        setCalorias(event.target.value);
    };

    const handleRegistro = () => {
        if (!username.trim()) {
            toast.error("Porfavor ingrese el nombre de usuario.");
            return;
        }
        if (!password.trim()) {
            toast.error("Porfavor ingrese la contraseña.");
            return;
        }
        if (!idPais.trim()) {
            toast.error("Porfavor ingrese su pais.");
            return;
        }
        if (!calorias || calorias <= 0) {
            toast.error("Porfavor ingrese el requerimiento de calorias diarias.");
            return;
        }
        registroObligatorio(username, password, idPais, calorias)
            .then(({ error, result }) => {
                if (error) {
                    toast.error(result.mensaje, { autoClose: 3000 });
                } else {
                    toast.success("Registro exitoso. Iniciando sesión...", { autoClose: 2000 });
                    setTimeout(() => {
                        localStorage.setItem('token', result.apiKey);
                        localStorage.setItem('id', result.id);
                        localStorage.setItem('calorias', result.caloriasDiarias);
                        navigate("/"); // Redirige al usuario al dashboard
                    }, 3000);
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
            <div id="registro">
                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="text-center">
                        <h1>Registro</h1>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre de usuario"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="mb-3">
                            <select className="form-select" aria-label="Selecciona tu país" value={idPais} onChange={handlePaisChange}>
                                <option value="" disabled>Selecciona tu país</option>
                                {paises.map(pais => (
                                    <option key={pais.id} value={pais.id}>{pais.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Calorías"
                                value={calorias}
                                onChange={handleCaloriasChange}
                            />
                            <small className="form-text text-muted">Requerimiento diario de calorías diarias.</small>
                        </div>
                        <button onClick={handleRegistro} className="btn btn-success btn-rounded">Registrarse</button>
                        <a class="btn btn-link" href="/Login" role="button">Ya tienes cuenta?</a>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Registro;
