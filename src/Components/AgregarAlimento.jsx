import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { obtenerAlimentos, registrarAlimento } from '../Services/service';
import { agregarAlimento } from '../Slices/alimentosUsuarioSlice';
import { cargarAlimentosDefault } from '../Slices/alimentosSlice';
import { buscarAlimento } from '../Utils/util';
import { useSelector } from 'react-redux';

const AgregarAlimento = () => {
    const dispatch = useDispatch();
    const alimentos = useSelector((state) => state.alimentosSlice.alimentos); //Obtiene los alimentos del store
    const [alimentoSeleccionado, setAlimentoSeleccionado] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');
    const [fechaValida, setFechaValida] = useState(true);
    const currentPath = window.location.pathname;
    const [unidadMedida, setUnidadMedida] = useState('_________');

    const obtenerAlimentosEnState = async () => {
        const resultado = await obtenerAlimentos();
        if (!resultado.error) {
            dispatch(cargarAlimentosDefault(resultado.result.alimentos));
        } else if (currentPath === "/" && !resultado.error) {
            toast.error("Hubo un error al obtener los alimentos.");
        }
    }

    useEffect(() => {
        obtenerAlimentosEnState();
    }, []);

    const handleCantidadChange = (event) => {
        setCantidad(event.target.value);
    };

    const handleAlimentoChange = (event) => {
        setAlimentoSeleccionado(event.target.value);
    };

    const handleFechaChange = (event) => {
        const fechaSeleccionada = new Date(event.target.value);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Establece la hora
        fechaSeleccionada.setHours(0, 0, 0, 0); // Establece la hora
        fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1); // Sumamos un dia
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);
        ayer.setHours(0, 0, 0, 0); // Establece la hora
        setFecha(event.target.value);
        setFechaValida(fechaSeleccionada <= hoy && fechaSeleccionada >= ayer); // Valida que la fecha sea hoy o un día anterior
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!fecha) {
            toast.error("Debe seleccionar una fecha.");
            return;
        }
        if (!cantidad.trim()) {
            toast.error("Debe ingresar la cantidad del alimento.");
            return;
        }
        if (cantidad <= 0) {
            toast.error("La cantidad del alimento debe ser mayor a cero.");
            return;
        }
        if (!fechaValida) {
            toast.error("La fecha debe ser hoy o un día anterior.");
            return;
        }
        try {
            const response = await registrarAlimento(alimentoSeleccionado, cantidad, fecha)
            if (!response.error) {
                const alimento = buscarAlimento(alimentoSeleccionado, alimentos);
                dispatch(agregarAlimento(alimento)); //El agregar alimento esta mal ya que lo agrega a la lista de alimentos y no a la de registros de la persona.
                toast.success("Alimento registrado con exito.", { autoClose: 2000 });
            } else if (currentPath === "/" && !response.error) {
                toast.error("Hubo un error al agregar el alimentos.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Cada vez que cambia alimentoSeleccionado, recalcula la unidad de medida
        const alimentoSeleccionadoObjeto = alimentos.find(alimento => alimento.id == alimentoSeleccionado);
        const unidadMedida = alimentoSeleccionadoObjeto ? alimentoSeleccionadoObjeto.porcion.match(/[a-zA-Z]+/)[0] : '';
        if (unidadMedida == "g") {
            setUnidadMedida("gramos");
        } else if (unidadMedida == "m") {
            setUnidadMedida("mililitros");
        } else if (unidadMedida == "u") {
            setUnidadMedida("unidad");
        }
    }, [alimentoSeleccionado, alimentos]);

    return (
        <div id='AgregarAlimento' className="col-md-6">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-4">Agregar Alimento</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="alimentos">Selecciona un alimento:</label>
                            <select id="alimentos" className="form-control" onChange={handleAlimentoChange} value={alimentoSeleccionado}>
                                <option value="" disabled>Seleccione un alimento...</option>
                                {alimentos.map(alimento => (
                                    <option key={alimento.id} value={alimento.id}>{alimento.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cantidad">Cantidad en <span style={{ color: "orange" }}>{unidadMedida}</span>:</label>
                            <input type="number" id="cantidad" className="form-control" value={cantidad} onChange={handleCantidadChange} />
                            <small className="form-text text-muted">Ingrese la cantidad de acuerdo a las unidades del alimento (g, u, m).</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha:</label>
                            <input type="date" id="fecha" className="form-control" value={fecha} onChange={handleFechaChange} />
                            <small className="form-text text-muted">Seleccione la fecha del consumo. La fecha puede ser hoy o un día anterior.</small>
                        </div>
                        <button type="submit" className="btn btn-primary">Agregar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AgregarAlimento;
