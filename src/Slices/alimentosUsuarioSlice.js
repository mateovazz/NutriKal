import { createSlice } from "@reduxjs/toolkit";

const initialState = { //estado inicial
    alimentos: [] //state
}

const alimentosUsuarioSlice = createSlice({
    name: "alimentos",
    initialState,
    reducers: {

        cargarAlimentos: (state, action) => {
            const alimentosIniciales = action.payload;
            state.alimentos = alimentosIniciales;
        },
        borrarAlimento: (state, action) => {
            const idAlimentoBorrar = action.payload;
            const copiaAlimentoFiltrado = state.alimentos.filter(
                alimento => alimento.id !== idAlimentoBorrar
            )
            state.alimento = copiaAlimentoFiltrado;
        },
        agregarAlimento: (state, action) => {
            const alimentoNuevo = action.payload;
            state.alimentos = [...state.alimentos, alimentoNuevo];
        }
        
    },
});
export const { cargarAlimentos, borrarAlimento, agregarAlimento } = alimentosUsuarioSlice.actions;
export default alimentosUsuarioSlice.reducer;