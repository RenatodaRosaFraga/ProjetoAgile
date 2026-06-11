'use client';

import api from './api';
import { Tarefa, TarefaFormState } from '@/app/types/tarefas';

export async function buscarListaTarefas(): Promise<Tarefa[]> {
  const response = await api.get<Tarefa[]>('/tarefas');
  return response.status === 200 ? response.data : [];
}

export async function salvarTarefa(tarefa: TarefaFormState): Promise<number> {
  const response = await api.post<number>('/tarefas', tarefa);
  if (response.status !== 200 && response.status !== 201) {
    throw new Error('Falha ao salvar tarefa');
  }
  return response.data;
}

export async function alterarStatusTarefa(id: number, status: string): Promise<void> {
  const response = await api.put(`/tarefas/${id}/status`, status, {
    headers: { 'Content-Type': 'text/plain' },
  });
  if (response.status !== 200) {
    throw new Error('Falha ao atualizar status da tarefa');
  }
}

export async function buscarTarefaPorId(id: number): Promise<Tarefa | null> {
  try {
    const response = await api.get<Tarefa>(`/tarefas/${id}`);
    return response.status === 200 ? response.data : null;
  } catch {
    return null;
  }
}
