'use client'
import { Usuario } from "../types/usuarios";
import api from "./api";

export async function buscarListaUsuarios(): Promise<Usuario[]> {
    const dados = await api.get<Usuario[]>('/usuarios');
    if (dados.status == 200) {
        return dados.data;
    }
    return [];
}

export async function alterarStatusUsuario(usuario: Usuario): Promise<void> {
    // Inverte o status enviando a String exata do Enum Java
    const novoStatus = usuario.status === "ATIVO" ? "INATIVO" : "ATIVO";

    const dadosResult = await api.put('/usuarios/' + usuario.id + '/AlterarStatus', { 
        status: novoStatus 
    });

    if (dadosResult.status !== 200) {
        alert("Erro ao atualizar Status!");
    }
}