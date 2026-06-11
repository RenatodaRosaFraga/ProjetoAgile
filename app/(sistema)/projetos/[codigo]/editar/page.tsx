'use client';

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Projeto } from "@/app/types/projetos";
import ProjetoForm from "../../componentes/ProjetoForm";
import api from "@/app/services/api";

export default function EditarProjetoPage({ params }: { params: Promise<{ codigo: string }> }) {
    const resolvedParams = use(params);
    const [projeto, setProjeto] = useState<Projeto | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarDados() {
            try {
                const idDaUrl = resolvedParams.codigo;
                if (!idDaUrl) return;

                const response = await api.get(`/projetos/${idDaUrl}`);

                if (response.data) {
                    setProjeto(response.data);
                }
            } catch (err) {
                console.error("Erro ao carregar projeto do banco:", err);
            } finally {
                setCarregando(false);
            }
        }
        carregarDados();
    }, [resolvedParams.codigo]);

    if (carregando) {
        return (
            <div className="p-12 flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-950 rounded-full animate-spin"></div>
                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest animate-pulse">Sincronizando com Spring Boot...</p>
            </div>
        );
    }

    if (!projeto) {
        return (
            <div className="p-12 text-center max-w-md mx-auto">
                <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-[2rem] mb-6">
                    <h2 className="text-xl font-black uppercase tracking-tighter">Projeto não encontrado</h2>
                    <p className="font-medium text-sm opacity-80 mt-2">O ID {resolvedParams.codigo} não foi localizado no banco de dados.</p>
                </div>
                <Link href="/projetos" className="inline-flex items-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
                    Voltar para a listagem
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 bg-[#FDFDFD]">
            <div className="max-w-2xl mx-auto mb-10">
                <div className="flex flex-col gap-6">
                    <Link href="/projetos" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-colors group w-fit">
                        <span className="group-hover:-translate-x-1 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </span>
                        Voltar
                    </Link>

                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-slate-950 tracking-tighter uppercase">Editar Projeto</h1>
                        <p className="text-slate-500 font-medium text-sm">
                            Você está editando o <span className="text-slate-950 font-bold underline decoration-slate-300">ID #{projeto.id}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                <ProjetoForm projetoInicial={projeto} />
            </div>
        </div>
    );
}
