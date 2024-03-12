// MapaUsuarios.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { obtenerPaises, obtenerUsuariosPorPais } from '../Services/service';
import { cargarUsuarios } from '../Slices/usuariosSlice';
import Mapa from './Mapa';

const MapaUsuarios = () => {
    const dispatch = useDispatch();
    const [paisesConUsuarios, setPaisesConUsuarios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                // Obtener datos de países
                const paisesData = await obtenerPaises();

                // Obtener cantidad de usuarios por país
                const usuariosPorPais = await obtenerUsuariosPorPais();

                // Combinar la información de paisesData y usuariosPorPais para obtener la cantidad de usuarios por país
                const paisesConUsuarios = paisesData.map(pais => {
                    // Buscar el país correspondiente en usuariosPorPais utilizando su ID
                    const usuarioDelPais = usuariosPorPais.result.paises.find(usuario => usuario.id === pais.id);
                    // Si se encuentra una coincidencia, obtener la cantidad de usuarios
                    const cantidadDeUsuarios = usuarioDelPais ? usuarioDelPais.cantidadDeUsuarios : 0;
                    // Devolver un objeto con los datos del país y la cantidad de usuarios
                    return {
                        id: pais.id,
                        name: pais.name,
                        currency: pais.currency,
                        latitude: pais.latitude,
                        longitude: pais.longitude,
                        cantidadDeUsuarios: cantidadDeUsuarios
                    };
                });

                setPaisesConUsuarios(paisesConUsuarios);

            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <>
            <div id='MapaUsuarios' className="col-md">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-2 text-center">Mapa de usuarios</h4>
                        <Mapa paisesConUsuarios={paisesConUsuarios} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MapaUsuarios;
