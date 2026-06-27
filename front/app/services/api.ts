'use client'
import axios, { AxiosHeaders } from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;

        if (token) {
            const headers = AxiosHeaders.from(config.headers);
            headers.set("Authorization", `Bearer ${token}`);
            config.headers = headers;
        }

        return config;
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('[Interceptor] Erro capturado:', error?.response?.status);
        if (error?.response?.status === 401) {
            console.log('[Interceptor] 401 detectado! Fazendo logout...');
            store.dispatch(logout());
        }

        return Promise.reject(error);
    }
);

export default api;
