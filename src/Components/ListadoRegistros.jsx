import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AlimentoListado from './AlimentoListado';
import { registrosUsuarioAPI } from '../Services/service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cargarAlimentos } from '../Slices/alimentosUsuarioSlice';

const ListadoRegistros = () => {

    const dispatch = useDispatch();
    const alimentos = useSelector((state) => state.alimentosUsuarioSlice.alimentos);
    const currentPath = window.location.pathname;
    const [filtroFecha, setFiltroFecha] = useState('todo');

    useEffect(() => {
        setTimeout(() => {
            obtenerAlimentosUsuarioAPI();
        }, 500);
    }, [alimentos]);

    const obtenerAlimentosUsuarioAPI = async () => {
        const resultado = await registrosUsuarioAPI();
        if (!resultado.error) {
            dispatch(cargarAlimentos(resultado.result.registros));
        } else if (currentPath == "/" && !resultado.error) {
            toast.error("Hubo un error al obtener los alimentos.");
        }
    }

    const filtrarAlimentosPorFecha = () => {
        const fechaActual = new Date();
        switch (filtroFecha) {
            case 'ultimaSemana':
                return alimentos.filter(alimento => {
                    const fechaRegistro = new Date(alimento.fecha);
                    const unaSemanaAtras = new Date(fechaActual.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return fechaRegistro >= unaSemanaAtras;
                });
            case 'ultimoMes':
                return alimentos.filter(alimento => {
                    const fechaRegistro = new Date(alimento.fecha);
                    const unMesAtras = new Date(fechaActual.getTime() - 30 * 24 * 60 * 60 * 1000);
                    return fechaRegistro >= unMesAtras;
                });
            default:
                return alimentos;
        }
    }

    return (
        <>
            <div id='ListadoAlimentos' className="col-md">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-4">Listado de alimentos registrados</h4>
                        <div className="form-group pb-2">
                            <label htmlFor="filtroFecha">Filtrar por fecha:</label>
                            <select
                                id="filtroFecha"
                                className="form-control"
                                value={filtroFecha}
                                onChange={(e) => setFiltroFecha(e.target.value)}
                            >
                                <option value="todo">Todo el histórico</option>
                                <option value="ultimaSemana">Última semana</option>
                                <option value="ultimoMes">Último mes</option>
                            </select>
                        </div>
                        <div>
                            {filtrarAlimentosPorFecha().length > 0 ? filtrarAlimentosPorFecha().map(
                                alimento => <AlimentoListado key={alimento.id} {...alimento} ></AlimentoListado>
                            )
                                : <h5>No hay alimentos para mostrar con el filtro seleccionado.</h5>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListadoRegistros