import React from 'react'
import { useSelector } from 'react-redux';

const CaloriasDiarias = () => {

    const registros = useSelector((state) => state.alimentosUsuarioSlice.alimentos);
    const alimentos = useSelector((state) => state.alimentosSlice.alimentos);
    const caloriasDiarias = localStorage.getItem("calorias");

    const calcularCaloriasDiarias = () => {
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        const hoy = today.toISOString().slice(0, 10); // Obtener la fecha de hoy en formato 'YYYY-MM-DD'
        let totalCaloriasDia = 0;
        registros.forEach((registro) => {
            if (registro.fecha === hoy) {
                totalCaloriasDia += calcularCaloriasAlimento(registro.idAlimento, registro.cantidad);
            }
        });
        return totalCaloriasDia;
    };

    const calcularCaloriasAlimento = (idAlimento, cantidad) => {
        const alimento = alimentos.find((alimento) => alimento.id === idAlimento);
        if (alimento) {
            return alimento.calorias * cantidad / alimento.porcion.replace(/[^\d.]/g, ''); // Elimina todas las letras excepto los dígitos y el punto
        }
        return 0;
    };

    const determinarColor = (caloriasDia, caloriasDiarias) => {
        const porcentaje = (caloriasDia / caloriasDiarias) * 100;
        if (porcentaje > 100) {
            return 'red';
        } else if (porcentaje >= 90) {
            return 'orange';
        } else {
            return 'green';
        }
    };

    const caloriasDia = calcularCaloriasDiarias();
    const color = determinarColor(caloriasDia, caloriasDiarias);

    return (
        <>
            <div id='CaloriasDiarias' className="col-md">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-4">Calorías Diarias</h4>
                        <p style={{ color }}>
                            {caloriasDia <= (caloriasDiarias * 0.90) && '¡Estás por debajo de tu requerimiento diario de calorías!'}
                            {caloriasDia > caloriasDiarias * 0.90 && caloriasDia <= caloriasDiarias && 'Estás dentro de tu rango de calorías diarias.'}
                            {caloriasDia > caloriasDiarias && '¡Has superado tu requerimiento diario de calorías!'}
                        </p>
                        <p style={{ color }}>Calorías registradas hoy: {caloriasDia}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CaloriasDiarias