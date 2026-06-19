import { AuthState } from "@/app/types/auth";
import { Usuario } from "@/app/types/usuarios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState : AuthState = {
    usuario: null,
    token: ""
}

const authSlice = createSlice({
        name:'auth',
        initialState,
        reducers:{
            login : (state, action: PayloadAction<{usuario: Usuario, token: string}>) => {

                state.token = action.payload.token;
                state.usuario = action.payload.usuario;
            },
            logout : (state) => {

                state.token ="";
                state.usuario =null;
            }
        }
    });

    export const { login, logout } = authSlice.actions;
    export default authSlice.reducer;
