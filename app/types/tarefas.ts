export type PrioridadeTarefa = "BAIXA" | "ALTA" | "URGENTE";
export type StatusTarefa = "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDO";

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: PrioridadeTarefa;
  status: StatusTarefa;
  projetoId: number;
  projetoNome: string;
  membroResponsavelId: number;
  membroResponsavelNome: string;
}

export interface TarefaFormState {
  titulo: string;
  descricao: string;
  prioridade: PrioridadeTarefa;
  status: StatusTarefa;
  projetoId: number | "";
  membroResponsavelId: number | "";
}
