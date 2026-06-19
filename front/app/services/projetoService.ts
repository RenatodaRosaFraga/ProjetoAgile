'use client'
import { Projeto } from "../types/projetos";
import api from "./api";

// Buscar todos os projetos
export async function buscarListaProjetos(): Promise<Projeto[]> {
  const dados = await api.get<Projeto[]>('/projetos');
  if (dados.status === 200) {
    return dados.data;
  }
  return [];
}

// Alterar status de um projeto
export async function alterarStatusProjeto(projeto: Projeto): Promise<void> {
  const novoStatus = projeto.status === "ATIVO" ? "INATIVO" : "ATIVO";

  const dadosResult = await api.put(`/projetos/${projeto.id}/AlterarStatus`, {
    status: novoStatus,
  });

  if (dadosResult.status !== 200) {
    alert("Erro ao atualizar Status do projeto!");
  }
}

// Buscar projeto por ID (útil para edição)
export async function buscarProjetoPorId(id: number): Promise<Projeto | null> {
  try {
    const response = await api.get<Projeto>(`/projetos/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
    return null;
  }
}
