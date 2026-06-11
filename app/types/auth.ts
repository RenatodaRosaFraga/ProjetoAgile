import { Usuario } from "./usuarios";

export interface LoginResponse{
    token: string;
    usuario: Usuario;
}

export interface AuthState {
    usuario: Usuario | null; 
    token: string;
}
