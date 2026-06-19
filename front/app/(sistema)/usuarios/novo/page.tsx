'use client';
import Link from "next/link";
import UsuarioForm from "../componentes/UsuarioForm";
import { useAppSelector } from "@/app/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function cadastrarUsuario() {
    const router = useRouter();
    const usuarioLogado = useAppSelector((state) => state.auth.usuario);
    const isAdmin = usuarioLogado?.role === "ROLE_ADMIN" || usuarioLogado?.role === "ROLE_ADM";

    useEffect(() => {
        if (usuarioLogado && !isAdmin) {
            router.replace('/usuarios');
        }
    }, [usuarioLogado, isAdmin, router]);

    if (usuarioLogado && !isAdmin) {
        return (
            <div className="min-h-full flex items-center justify-center py-20 px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-slate-950">Acesso negado</h1>
                    <p className="mt-4 text-slate-500">Somente administradores podem cadastrar novos usuários.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-full py-8 px-4 sm:px-6 lg:px-8">
            {/* Container centralizado para não esticar demais */}
            <div className="max-w-2xl mx-auto mb-8">
                <div className="flex flex-col gap-4">
                    {/* Link Voltar Estilizado */}
                    <Link
                        href="/usuarios"
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-950 transition-colors group w-fit"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </span>
                        Voltar para a listagem
                    </Link>

                    {/* Título Principal */}
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-slate-950 tracking-tighter">
                            Cadastro de Novo Usuário
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Preencha os dados para cadastrar um usuário.
                        </p>
                    </div>
                </div>
            </div>

            {/* O seu Formulário que já está estilizado */}
            <UsuarioForm />
        </div>
    )
}