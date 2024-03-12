import React, { useState, useEffect } from 'react';

const CuentaRegresiva = () => {
    const [tiempoRestante, setTiempoRestante] = useState({ dias: 0, horas: 0, minutos: 0 });

    useEffect(() => {
        const calcularTiempoRestante = () => {
            // Obtener la fecha de hoy
            const hoy = new Date();

            // Definir la fecha objetivo (31 de marzo de 2024)
            const objetivo = new Date('2024-03-31');

            // Calcular la diferencia en milisegundos entre las dos fechas
            const diferencia = objetivo.getTime() - hoy.getTime();

            // Convertir la diferencia de milisegundos a días
            const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

            setTiempoRestante({ dias, horas, minutos });
        };

        // Calcular el tiempo restante al cargar el componente
        calcularTiempoRestante();

        // Actualizar el tiempo restante cada minuto
        const intervalo = setInterval(calcularTiempoRestante, 60000);

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(intervalo);
    }, []);

    const determinarColor = () => {
        if (tiempoRestante.dias > 0) {
            return 'red';
        } else if (tiempoRestante.dias = 0) {
            return 'orange';
        } else {
            return 'green';
        }
    };

    const color = determinarColor();

    return (
        <div id='NuevosObjetivos' className="col-md">
            <div className="card">
                <div className="card-body">
                    {tiempoRestante.dias >= 0 && tiempoRestante.horas >= 0 && tiempoRestante.minutos > 0 ? (
                        <h4 className="card-title mb-4">
                            Tiempo restante para definir nuevos objetivos: <span style={{ color }}>
                                {tiempoRestante.dias} días, {tiempoRestante.horas} horas, {tiempoRestante.minutos} minutos
                            </span>
                        </h4>
                    ) : (
                        <h4 className="card-title mb-4">
                            ¡Ya es hora de definir nuevos objetivos!
                        </h4>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CuentaRegresiva;
