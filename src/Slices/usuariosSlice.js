import { createSlice } from "@reduxjs/toolkit";

const initialState = { //estado inicial
    usuarios: []
}

const usuariosSlice = createSlice({
    name: "usuarios",
    initialState,
    reducers: {

        cargarUsuarios: (state, action) => {
            const usuariosIniciales = action.payload;
            state.usuarios = usuariosIniciales;
        },

    },
});
export const { cargarUsuarios } = usuariosSlice.actions;
export default usuariosSlice.reducer;