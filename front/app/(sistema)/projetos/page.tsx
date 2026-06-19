'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Projeto } from '@/app/types/projetos';
import api from '@/app/services/api';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { toggleFavorito } from '@/app/redux/slices/favoritosSlice';

export default function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const dispatch = useAppDispatch();
  const favoritos = useAppSelector((state) => state.favoritos.itens);
  const isFavorito = (id: number) => favoritos.some((item) => item.id === id);

  const carregarProjetos = async () => {
    try {
      setCarregando(true);
      const response = await api.get<Projeto[]>('/projetos');
      if (response.status === 200) {
        setProjetos(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
      alert("Erro ao carregar dados dos projetos!");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarProjetos();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* HEADER DA TELA (Padrão do Professor) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-950 tracking-tighter uppercase">Gestão de Projetos</h1>
            <p className="text-sm text-slate-500 font-medium">Controle de escopo, prazos e andamento das demandas.</p>
          </div>
          <Link
            href="/projetos/novo"
            className="bg-slate-950 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-950/10 active:scale-95 flex items-center gap-2"
          >
            + Novo Projeto
          </Link>
        </div>

        {/* TABELA DE DADOS (Substituindo os Cards) */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ID</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Projeto</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Prazo</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Localização</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Favorito</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                
                {/* ESTADO DE CARREGAMENTO (Skeleton adaptado para linhas de tabela) */}
                {carregando && (
                  [1, 2, 3].map((i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-8 py-5.5">
                        <div className="h-5 bg-slate-100 rounded-lg w-full" />
                      </td>
                    </tr>
                  ))
                )}

                {/* LISTAGEM DOS PROJETOS */}
                {!carregando && projetos.map((projeto) => (
                  <tr key={projeto.id} className="hover:bg-slate-50/30 transition-colors group">
                    
                    {/* ID */}
                    <td className="px-8 py-5 text-sm font-bold text-slate-400">
                      #{projeto.id}
                    </td>
                    
                    {/* NOME DO PROJETO */}
                    <td className="px-8 py-5 text-sm font-black text-slate-950 uppercase tracking-tight">
                      {projeto.nome}
                    </td>
                    
                    {/* PRAZO FORMATADO */}
                    <td className="px-8 py-5 text-sm font-medium text-slate-500">
                      {projeto.prazo
                        ? (projeto.prazo.includes('-')
                            ? projeto.prazo.split('-').reverse().join('/')
                            : projeto.prazo)
                        : <span className="text-slate-300 text-xs">-</span>}
                    </td>

                    {/* LOCALIZAÇÃO */}
                    <td className="px-8 py-5 text-sm font-medium text-slate-500">
                      {projeto.localidade && projeto.uf ? (
                        <span className="inline-flex items-center gap-1">
                          📍 {projeto.localidade}/{projeto.uf}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">-</span>
                      )}
                    </td>
                    
                    {/* STATUS DE FAVORITO (Como um Badge/Botão elegante) */}
                    <td className="px-8 py-5">
                      <button 
                        onClick={() => dispatch(toggleFavorito(projeto))}
                        className="p-1.5 rounded-lg hover:bg-slate-50 transition-all active:scale-115"
                        title={isFavorito(projeto.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      >
                        {isFavorito(projeto.id) ? (
                          <span className="text-base leading-none block">⭐</span>
                        ) : (
                          <span className="text-base text-slate-300 hover:text-amber-400 transition-colors leading-none block">☆</span>
                        )}
                      </button>
                    </td>
                    
                    {/* AÇÕES (Alinhado à direita seguindo o professor) */}
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end items-center gap-3">
                        <Link
                          href={`/projetos/${projeto.id}/editar`}
                          className="p-2.5 text-slate-400 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            <path d="m15 5 4 4"/>
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* ESTADO VAZIO (Padrão de tabela) */}
                {!carregando && projetos.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-medium text-slate-400 italic">
                          Nenhum projeto encontrado.
                        </span>
                        <Link href="/projetos/novo" className="text-xs text-indigo-600 font-bold hover:underline uppercase tracking-wider">
                          Criar primeiro projeto
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
