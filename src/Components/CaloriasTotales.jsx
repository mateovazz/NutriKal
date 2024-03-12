import React from 'react';
import { useSelector } from 'react-redux';

const CaloriasTotales = () => {
    const registros = useSelector((state) => state.alimentosUsuarioSlice.alimentos);
    const alimentos = useSelector((state) => state.alimentosSlice.alimentos);

    // Función para calcular las calorías totales
    const calcularCaloriasTotales = () => {
        let totalCalorias = 0;
        registros.forEach((registro) => {
            const alimento = alimentos.find((alimento) => alimento.id === registro.idAlimento);
            if (alimento) {
                totalCalorias += registro.cantidad * alimento.calorias / alimento.porcion.replace(/[^\d.]/g, '');
            }
        });
        return totalCalorias;
    };

    const totalCalorias = calcularCaloriasTotales();

    return (
        <>
            <div id='CaloriasTotales' className="col-md">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-4">Calorías Totales</h4>
                        <div>
                            <p>Total de calorías ingeridas hasta el momento: {totalCalorias}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CaloriasTotales;