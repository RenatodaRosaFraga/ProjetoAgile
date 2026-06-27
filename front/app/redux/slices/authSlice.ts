'use client';

import { AuthState } from "@/app/types/auth";
import { Usuario } from "@/app/types/usuarios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie";

const TOKEN_COOKIE = '@TaskAgile:token';
const USUARIO_COOKIE = '@TaskAgile:usuario';

const initialState : AuthState = {
    usuario: null,
    token: "",
    isHydrated: false
};

const authSlice = createSlice({
        name:'auth',
        initialState,
        reducers:{
            hydrate: (state) => {
                // Recupera dados dos cookies (apenas no cliente)
                if (typeof window !== 'undefined') {
                    const token = Cookies.get(TOKEN_COOKIE) || "";
                    const usuarioStr = Cookies.get(USUARIO_COOKIE);

                    if (token) {
                        state.token = token;
                    }

                    if (usuarioStr) {
                        try {
                            state.usuario = JSON.parse(usuarioStr) as Usuario;
                        } catch (e) {
                            console.error("Erro ao recuperar usuário do cookie", e);
                        }
                    }
                }
                state.isHydrated = true;
            },
            login : (state, action: PayloadAction<{usuario: Usuario, token: string}>) => {
                state.token = action.payload.token;
                state.usuario = action.payload.usuario;

                // Salva nos cookies (expira em 7 dias)
                Cookies.set(TOKEN_COOKIE, action.payload.token, { expires: 7, path: '/' });
                Cookies.set(USUARIO_COOKIE, JSON.stringify(action.payload.usuario), { expires: 7, path: '/' });
            },
            logout : (state) => {
                state.token = "";
                state.usuario = null;

                // Remove dos cookies
                Cookies.remove(TOKEN_COOKIE, { path: '/' });
                Cookies.remove(USUARIO_COOKIE, { path: '/' });
            }
        }
    });

    export const { hydrate, login, logout } = authSlice.actions;
    export default authSlice.reducer;
