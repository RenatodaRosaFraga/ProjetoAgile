// app/types/favorito.ts
import { Projeto } from "./projetos";

export interface FavoritoContextType {
  favoritos: Projeto[];
  alternarFavorito: (projeto: Projeto) => void;
  isFavorito: (id: number) => boolean;
}
