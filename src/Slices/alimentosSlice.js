import { createSlice } from "@reduxjs/toolkit";

const initialState = { //estado inicial
    alimentos: [] //state
}

const alimentosSlice = createSlice({
    name: "alimentos",
    initialState,
    reducers: {

        cargarAlimentosDefault: (state, action) => {
            const alimentosIniciales = action.payload;
            state.alimentos = alimentosIniciales;
        }
        
    },
});
export const { cargarAlimentosDefault } = alimentosSlice.actions;
export default alimentosSlice.reducer;