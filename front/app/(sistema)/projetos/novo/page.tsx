'use client';

import Link from "next/link";
import ProjetoForm from "../componentes/ProjetoForm"; // Ajuste o caminho se o seu formulário estiver em outra pasta

export default function CadastrarProjeto() {
    return (
        <div className="min-h-full py-8 px-4 sm:px-6 lg:px-8">
            {/* Container centralizado para não esticar demais */}
            <div className="max-w-2xl mx-auto mb-8">
                <div className="flex flex-col gap-4">
                    
                    {/* Link Voltar Estilizado com efeito Hover no SVG */}
                    <Link
                        href="/projetos"
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-950 transition-colors group w-fit"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </span>
                        Voltar para a listagem
                    </Link>

                    {/* Título Principal e Subtítulo */}
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-slate-950 tracking-tighter">
                            Cadastro de Novo Projeto
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Preencha os dados para iniciar uma nova frente de trabalho.
                        </p>
                    </div>
                </div>
            </div>

            {/* O seu Formulário que já está com a lógica híbrida de salvar/editar */}
            <ProjetoForm />
        </div>
    );
}