import { configureStore } from '@reduxjs/toolkit'
import alimentosSlice from '../Slices/alimentosSlice'
import usuariosSlice from '../Slices/usuariosSlice'
import alimentosUsuarioSlice from '../Slices/alimentosUsuarioSlice'

export const store = configureStore({
    reducer: {
        alimentosSlice, 
        usuariosSlice, 
        alimentosUsuarioSlice
    },
})