import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Grafica from './Grafica';

const GraficoCantidadesPorAlimento = () => {
    const [alimentosConRegistros, setAlimentosConRegistros] = useState([]);
    const registros = useSelector((state) => state.alimentosUsuarioSlice.alimentos); // Obtenemos los registros de alimentos del usuario
    const alimentosDelSistema = useSelector((state) => state.alimentosSlice.alimentos); // Obtenemos los alimentos del sistema

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Filtramos los registros para obtener solo los que tienen una cantidad mayor que cero
                const alimentosFiltrados = registros.filter(registro => registro.cantidad > 0);

                // Creamos un objeto para almacenar la cantidad de veces que se consumió cada alimento
                const vecesConsumidas = {};

                // Iteramos sobre los registros para contar las veces que se consumió cada alimento
                alimentosFiltrados.forEach(registro => {
                    if (vecesConsumidas[registro.idAlimento]) {
                        vecesConsumidas[registro.idAlimento]++;
                    } else {
                        vecesConsumidas[registro.idAlimento] = 1;
                    }
                });

                // Obtenemos los nombres de los alimentos y las cantidades correspondientes
                const etiquetas = [];
                const cantidades = [];

                for (const idAlimento in vecesConsumidas) {
                    const alimento = alimentosDelSistema.find(item => item.id === parseInt(idAlimento));
                    if (alimento) {
                        etiquetas.push(alimento.nombre);
                        cantidades.push(vecesConsumidas[idAlimento]);
                    }
                }

                setAlimentosConRegistros({ etiquetas, cantidades });
            } catch (error) {
                console.error('Error al obtener datos de alimentos:', error);
            }
        };

        fetchData();
    }, [registros, alimentosDelSistema]); // Agregamos registros y alimentosDelSistema como dependencias para que se ejecute el efecto cuando cambien

    return (
        <div id='Graficas' className="col-md">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-2 text-center">Gráfico de cantidades por alimento</h4>
                    <Grafica
                        etiquetas={alimentosConRegistros.etiquetas}
                        datos={alimentosConRegistros.cantidades}
                        nombreGrafica="Cantidades por Alimento"
                        nombreDatos="Veces Consumidas"
                    />
                </div>
            </div>
        </div>
    );
};

export default GraficoCantidadesPorAlimento;
