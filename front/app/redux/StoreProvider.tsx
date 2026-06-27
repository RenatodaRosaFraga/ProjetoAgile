"use client"

import { Provider } from "react-redux"
import { store } from "./store"
import { hydrate, logout } from "./slices/authSlice"
import { useEffect, useRef } from "react"
import api from "../services/api"

export default function StoreProvider({children}: {children : React.ReactNode}){
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            store.dispatch(hydrate());
            initialized.current = true;

            // Valida o token fazendo uma requisição silenciosa
            const validateToken = async () => {
                const { token } = store.getState().auth;

                if (token) {
                    try {
                        // Faz uma requisição qualquer para validar o token
                        // Se o token estiver expirado, o interceptor vai detectar o 401
                        await api.get('/tarefas');
                        console.log('[StoreProvider] Token válido');
                    } catch (error: any) {
                        console.log('[StoreProvider] Erro na validação:', error?.response?.status);
                        // Se der erro 401, o interceptor já fez logout
                        // Mas se o backend estiver offline, fazemos logout também
                        if (!error?.response) {
                            console.log('[StoreProvider] Backend offline, fazendo logout');
                            store.dispatch(logout());
                        }
                    }
                }
            };

            validateToken();
        }
    }, []);

    return <Provider store={store}>{children}</Provider>
}