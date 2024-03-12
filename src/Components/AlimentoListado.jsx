import React, { useEffect, useState } from 'react';
import { borrarAlimentoAPI } from '../Services/service';
import { useDispatch, useSelector } from 'react-redux';
import { borrarAlimento } from '../Slices/alimentosUsuarioSlice';
import { buscarAlimento } from '../Utils/util';
import { ToastContainer, toast } from 'react-toastify';

const AlimentoListado = ({ id, idAlimento, idUsuario, cantidad, fecha }) => {

    const dispatch = useDispatch()
    const currentPath = window.location.pathname;
    const alimentos = useSelector((state) => state.alimentosSlice.alimentos);
    const [alimento, setAlimento] = useState('');
    const baseUrl = 'https://calcount.develotion.com/imgs/';

    const handleClick = async (event) => {
        try {
            const response = await borrarAlimentoAPI(id);
            if (!response.error) {
                dispatch(borrarAlimento(idAlimento));
                toast.error("Alimento borrado.", { autoClose: 2000 });
            } else if (currentPath == "/" && !response.error) {
                toast.error("Hubo un error al borrar el alimento.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        obtenerAlimento();
    }, []);

    const obtenerAlimento = async () => {
        const alimento = await buscarAlimento(idAlimento, alimentos);
        setAlimento(alimento);
    }

    if (!alimento) {
        return null; // Otra opción es devolver un indicador de carga o un mensaje mientras se carga el alimento
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center p-1">
                <div>
                    <img src={`${baseUrl}${alimento.imagen}.png`} alt={alimento.nombre} style={{ width: '30px', marginRight: '10px' }} />
                    <span>{alimento.nombre} registrado/a el {fecha}</span>
                </div>
                <button onClick={handleClick} className="btn btn-danger">BORRAR</button>
            </div>
        </>
    )
}

export default AlimentoListado