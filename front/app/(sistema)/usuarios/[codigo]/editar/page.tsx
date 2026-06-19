'use client'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UsuarioForm from "../../componentes/UsuarioForm";
import api from "@/app/services/api"; // UPDATE: Importando sua instância configurada
import { Usuario } from "@/app/types/usuarios";
import axios from "axios"; // Mantemos para o tratamento de erro se necessário
import { useAppSelector } from "@/app/redux/hooks";

export default function EditarUsuario() {

    const params = useParams();
    const router = useRouter();
    const codigo = Number(params.codigo);
    const usuarioLogado = useAppSelector((state) => state.auth.usuario);
    const isAdmin = usuarioLogado?.role === "ROLE_ADMIN" || usuarioLogado?.role === "ROLE_ADM";

    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        if (usuarioLogado && !isAdmin) {
            router.replace('/usuarios');
            return;
        }

        async function loadDados() {
            try {
                // UPDATE: Usando 'api' em vez de 'axios' e simplificando a URL
                const response = await api.get<Usuario>(`/usuarios/${codigo}`);

                if (response.data) {
                    setUsuario(response.data);
                } else {
                    router.push("/usuarios");
                }
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
                
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    alert("Sessão expirada ou sem permissão.");
                }
                
                router.push("/usuarios");
            }
        }

        if (codigo) {
            loadDados();
        }
    }, [codigo, router, usuarioLogado, isAdmin]);

    if (usuarioLogado && !isAdmin) {
        return (
            <div className="min-h-full flex items-center justify-center py-20 px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-slate-950">Acesso negado</h1>
                    <p className="mt-4 text-slate-500">Somente administradores podem editar usuários.</p>
                </div>
            </div>
        );
    }

    if (!usuario) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-pulse font-bold text-slate-400">Carregando dados...</div>
            </div>
        );
    }

    return (
        <div className="min-h-full py-8 px-4 sm:px-6 lg:px-8">
             <div className="max-w-2xl mx-auto mb-8">
                <h1 className="text-4xl font-black text-slate-950 tracking-tighter">
                    Editar Usuário
                </h1>
                <p className="text-slate-500 font-medium">
                    Preencha os dados abaixo para editar um usuário no sistema.
                </p>
            </div>
            
            <UsuarioForm usuarioExistente={usuario}/>
        </div>
    );
}