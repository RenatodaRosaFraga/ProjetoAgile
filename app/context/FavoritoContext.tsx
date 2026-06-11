'use client';

import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { Projeto } from '@/app/types/projetos';
import { FavoritoContextType } from '@/app/types/favorito';

const FavoritoContext = createContext<FavoritoContextType | undefined>(undefined);

const COOKIE_NAME = '@TaskAgile:favoritos';

export function FavoritoProvider({ children }: { children: React.ReactNode }) {
  const [favoritos, setFavoritos] = useState<Projeto[]>(() => {
    const salvos = Cookies.get(COOKIE_NAME);
    if (!salvos) return [];
    try {
      return JSON.parse(salvos) as Projeto[];
    } catch (e) {
      console.error("Erro ao converter favoritos dos cookies", e);
      return [];
    }
  });

  const alternarFavorito = (projeto: Projeto) => {
    setFavoritos((prev) => {
      const existe = prev.find((p) => p.id === projeto.id);
      let novaLista: Projeto[];

      if (existe) {
        novaLista = prev.filter((p) => p.id !== projeto.id);
      } else {
        novaLista = [...prev, projeto];
      }

      Cookies.set(COOKIE_NAME, JSON.stringify(novaLista), { expires: 7, path: '/' });
      return novaLista;
    });
  };

  const isFavorito = (id: number) => favoritos.some((p) => p.id === id);

  return (
    <FavoritoContext.Provider value={{ favoritos, alternarFavorito, isFavorito }}>
      {children}
    </FavoritoContext.Provider>
  );
}

export const useFavoritos = () => {
  const context = useContext(FavoritoContext);
  if (!context) throw new Error('useFavoritos deve ser usado dentro de um FavoritoProvider');
  return context;
};