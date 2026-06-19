import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Projeto } from '@/app/types/projetos';
import { logout } from './authSlice';

interface FavoritosState {
  itens: Projeto[];
}

const initialState: FavoritosState = {
  itens: [],
};

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    toggleFavorito: (state, action: PayloadAction<Projeto>) => {
      const projeto = action.payload;
      const existe = state.itens.some((item) => item.id === projeto.id);

      if (existe) {
        state.itens = state.itens.filter((item) => item.id !== projeto.id);
        return;
      }

      state.itens.push(projeto);
    },
    limparFavoritos: (state) => {
      state.itens = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.itens = [];
    });
  },
});

export const { toggleFavorito, limparFavoritos } = favoritosSlice.actions;
export default favoritosSlice.reducer;
