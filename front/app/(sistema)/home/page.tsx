'use client';

import React from 'react';
import Link from 'next/link';
import { Projeto } from "@/app/types/projetos";
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { toggleFavorito } from '@/app/redux/slices/favoritosSlice';

export default function Home() {
  const favoritos = useAppSelector((state) => state.favoritos.itens);
  const dispatch = useAppDispatch();

  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen">
      {/* HEADER NO PADRÃO 'MEUS PROJETOS' */}
      <div className="flex justify-between items-center mb-12">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-slate-950 uppercase">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Bem-vindo ao seu painel de controle
          </p>
        </div>
      </div>

      {/* SEÇÃO DE FAVORITOS */}
      <section>
        <div className="flex items-center gap-2 mb-8">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">
            Projetos Favoritos
          </h2>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        {favoritos.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-2xl shadow-inner">⭐</div>
            <p className="text-slate-400 font-medium max-w-xs">
              Você ainda não tem projetos favoritos para exibir aqui.
            </p>
            <Link href="/projetos" className="text-indigo-600 font-bold text-sm hover:underline uppercase tracking-widest">
              Ver todos os projetos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favoritos.map((projeto: Projeto) => (
              <div 
                key={projeto.id} 
                className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all group relative overflow-hidden"
              >
                {/* TOPO: BARRINHA + ESTRELA (FLEXBOX) */}
                <div className="flex items-center justify-between mb-4 gap-4">
                  <div className={`h-1.5 flex-1 rounded-full ${projeto.id % 2 === 0 ? 'bg-indigo-500' : 'bg-slate-950'}`} />
                  
                  <button 
                    onClick={() => dispatch(toggleFavorito(projeto))}
                    className="p-2 rounded-xl bg-amber-50 shadow-sm flex-shrink-0 active:scale-125 transition-transform"
                  >
                    <span className="text-xl leading-none block">⭐</span>
                  </button>
                </div>

                {/* TÍTULO NO PADRÃO DO PROJETO */}
                <h2 className="text-xl font-bold text-slate-950 mb-2 group-hover:text-indigo-600 transition-colors">
                  {projeto.nome}
                </h2>
                
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Prazo</span>
                  <span className="text-sm font-bold text-slate-600">
                    {projeto.prazo.includes('-') 
                      ? projeto.prazo.split('-').reverse().join('/') 
                      : projeto.prazo}
                  </span>
                </div>

                {/* AÇÕES */}
                <div className="mt-6 pt-5 border-t border-slate-50 flex justify-between items-center">
                  <Link 
                    href={`/projetos/${projeto.id}/editar`}
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
                    </svg>
                    Gerenciar
                  </Link>

                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-slate-50 text-slate-400 rounded-lg border border-slate-100">
                    #{projeto.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
