import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grafica from "./Grafica";

const GraficoCaloriasPorFecha = () => {
  const [caloriasPorFecha, setCaloriasPorFecha] = useState([]);
  const registros = useSelector((state) => state.alimentosUsuarioSlice.alimentos);
  const alimentosDelSistema = useSelector((state) => state.alimentosSlice.alimentos);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Creamos un objeto para almacenar las calorías por fecha
        const caloriasPorFecha = {};

        // Iteramos sobre los registros para sumar las calorías ingeridas por fecha
        for (const registro of registros) {
          // Agarramos el alimento del registro
          const alimento = alimentosDelSistema.find(
            (item) => item.id === registro.idAlimento
          );

          // Si el alimento existe y tiene calorías
          if (alimento && alimento.calorias) {
            // Obtenemos la fecha del registro
            const fechaRegistro = new Date(registro.fecha);
            const fechaFormateada = fechaRegistro.toISOString().split("T")[0]; // Formato YYYY-MM-DD

            // Inicializamos la cantidad de calorías para esta fecha en 0 si no existe
            if (!caloriasPorFecha[fechaFormateada]) {
              caloriasPorFecha[fechaFormateada] = 0;
            }

            // Calculamos las calorías del alimento según la cantidad consumida y la unidad de medida
            let caloriasConsumidas = 0;
            if (alimento.porcion) {
              const match = alimento.porcion.match(/(\d+)([a-zA-Z]+)/);
              if (match) {
                const cantidadPorcion = parseFloat(match[1]);
                const unidadPorcion = match[2].toLowerCase();
                if (unidadPorcion === "g") {
                  caloriasConsumidas =
                    (alimento.calorias * registro.cantidad) / cantidadPorcion;
                } else if (unidadPorcion === "u") {
                  caloriasConsumidas = alimento.calorias * registro.cantidad;
                }
              }
            }

            // Sumamos las calorías consumidas al total para esta fecha
            caloriasPorFecha[fechaFormateada] += caloriasConsumidas;
          }
        }

        // Obtenemos los últimos 7 días, incluyendo el actual
        const etiquetas = [];
        const cantidades = [];

        const fechaActual = new Date();
        for (let i = 6; i >= 0; i--) {
          const fecha = new Date();
          fecha.setDate(fechaActual.getDate() - i);
          const fechaFormateada = fecha.toISOString().split("T")[0]; // Formato YYYY-MM-DD
          etiquetas.push(fechaFormateada);
          cantidades.push(caloriasPorFecha[fechaFormateada] || 0);
        }

        setCaloriasPorFecha({ etiquetas, cantidades });
      } catch (error) {
        console.error("Error al obtener datos de calorías:", error);
      }
    };

    fetchData();
  }, [registros, alimentosDelSistema]);

  return (
    <div className="col-md">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-2 text-center">
            Gráfico de calorías por fecha
          </h4>
          <Grafica
            etiquetas={caloriasPorFecha.etiquetas}
            datos={caloriasPorFecha.cantidades}
            nombreGrafica="Calorías por Fecha"
            nombreDatos="Calorías Consumidas"
          />
        </div>
      </div>
    </div>
  );
};

export default GraficoCaloriasPorFecha;
