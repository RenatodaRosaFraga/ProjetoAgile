'use client';

import { useEffect, useMemo, useState } from 'react';
import { buscarListaProjetos } from '@/app/services/projetoService';
import { buscarListaUsuarios } from '@/app/services/usuarioService';
import { alterarStatusTarefa, buscarListaTarefas, salvarTarefa } from '@/app/services/tarefaService';
import { Projeto } from '@/app/types/projetos';
import { Usuario } from '@/app/types/usuarios';
import { StatusTarefa, Tarefa, TarefaFormState } from '@/app/types/tarefas';

const colunas: { label: string; value: StatusTarefa }[] = [
  { label: 'Pendente', value: 'PENDENTE' },
  { label: 'Em Andamento', value: 'EM_ANDAMENTO' },
  { label: 'Concluído', value: 'CONCLUIDO' },
];

const estadoInicial: TarefaFormState = {
  titulo: '',
  descricao: '',
  prioridade: 'BAIXA',
  status: 'PENDENTE',
  projetoId: '',
  membroResponsavelId: '',
};

export default function TarefaBoard() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [form, setForm] = useState<TarefaFormState>(estadoInicial);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const carregarDados = async () => {
    setCarregando(true);
    try {
      const [listaTarefas, listaProjetos, listaUsuarios] = await Promise.all([
        buscarListaTarefas(),
        buscarListaProjetos(),
        buscarListaUsuarios(),
      ]);
      setTarefas(listaTarefas);
      setProjetos(listaProjetos);
      setUsuarios(listaUsuarios);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const tarefasPorColuna = useMemo(() => {
    return colunas.reduce<Record<StatusTarefa, Tarefa[]>>((acc, coluna) => {
      acc[coluna.value] = tarefas.filter((tarefa) => tarefa.status === coluna.value);
      return acc;
    }, {
      PENDENTE: [],
      EM_ANDAMENTO: [],
      CONCLUIDO: [],
    });
  }, [tarefas]);

  const atualizarCampo = <K extends keyof TarefaFormState>(campo: K, valor: TarefaFormState[K]) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const criarTarefa = async () => {
    if (!form.titulo.trim() || !form.descricao.trim() || !form.projetoId || !form.membroResponsavelId) {
      alert('Preencha título, descrição, projeto e responsável.');
      return;
    }

    setSalvando(true);
    try {
      const payload: TarefaFormState = {
        ...form,
        projetoId: Number(form.projetoId),
        membroResponsavelId: Number(form.membroResponsavelId),
      };

      await salvarTarefa(payload);

      if (payload.prioridade === 'URGENTE') {
        alert('Alerta: tarefa urgente criada.');
      }

      setForm(estadoInicial);
      await carregarDados();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar tarefa.');
    } finally {
      setSalvando(false);
    }
  };

  const moverStatus = async (tarefa: Tarefa, status: StatusTarefa) => {
    try {
      await alterarStatusTarefa(tarefa.id, status);
      await carregarDados();
    } catch (error) {
      console.error(error);
      alert('Erro ao alterar status da tarefa.');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-slate-950 uppercase">Quadro de Tarefas</h1>
          <p className="text-sm text-slate-500 font-medium">Organização das tarefas do workspace por status.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Nova Tarefa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <input className="w-full p-4 rounded-2xl bg-slate-50 ring-1 ring-slate-200 outline-none" placeholder="Título" value={form.titulo} onChange={(e) => atualizarCampo('titulo', e.target.value)} />
          <select className="w-full p-4 rounded-2xl bg-slate-50 ring-1 ring-slate-200 outline-none" value={form.prioridade} onChange={(e) => atualizarCampo('prioridade', e.target.value as TarefaFormState['prioridade'])}>
            <option value="BAIXA">Baixa</option>
            <option value="ALTA">Alta</option>
            <option value="URGENTE">Urgente</option>
          </select>
          <select className="w-full p-4 rounded-2xl bg-slate-50 ring-1 ring-slate-200 outline-none" value={form.status} onChange={(e) => atualizarCampo('status', e.target.value as TarefaFormState['status'])}>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="CONCLUIDO">Concluído</option>
          </select>
          <select className="w-full p-4 rounded-2xl bg-slate-50 ring-1 ring-slate-200 outline-none" value={form.projetoId} onChange={(e) => atualizarCampo('projetoId', e.target.value ? Number(e.target.value) : '')}>
            <option value="">Selecione o projeto</option>
            {projetos.map((projeto) => <option key={projeto.id} value={projeto.id}>{projeto.nome}</option>)}
          </select>
          <select className="w-full p-4 rounded-2xl bg-slate-50 ring-1 ring-slate-200 outline-none" value={form.membroResponsavelId} onChange={(e) => atualizarCampo('membroResponsavelId', e.target.value ? Number(e.target.value) : '')}>
            <option value="">Selecione o responsável</option>
            {usuarios.map((usuario) => <option key={usuario.id ?? usuario.email} value={usuario.id ?? ''}>{usuario.nome}</option>)}
          </select>
          <input className="w-full p-4 rounded-2xl bg-slate-50 ring-1 ring-slate-200 outline-none md:col-span-2 xl:col-span-1" placeholder="Descrição" value={form.descricao} onChange={(e) => atualizarCampo('descricao', e.target.value)} />
        </div>
        <button onClick={criarTarefa} disabled={salvando} className="px-6 py-3 rounded-2xl bg-slate-950 text-white font-black uppercase tracking-widest disabled:opacity-60">
          {salvando ? 'Salvando...' : '+ Nova Tarefa'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {colunas.map((coluna) => (
          <div key={coluna.value} className="bg-slate-50 p-4 rounded-[2rem] border border-slate-200 min-h-[420px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">{coluna.label}</h2>
              <span className="text-[10px] font-black uppercase text-slate-500">{tarefasPorColuna[coluna.value].length}</span>
            </div>
            <div className="flex flex-col gap-3">
              {carregando && <div className="text-sm text-slate-400">Carregando...</div>}
              {!carregando && tarefasPorColuna[coluna.value].map((tarefa) => (
                <article key={tarefa.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-slate-950">{tarefa.titulo}</h3>
                      <p className="text-xs text-slate-500 mt-1">{tarefa.projetoNome} · {tarefa.membroResponsavelNome}</p>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${tarefa.prioridade === 'URGENTE' ? 'text-red-600' : tarefa.prioridade === 'ALTA' ? 'text-orange-600' : 'text-slate-400'}`}>
                      {tarefa.prioridade}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 line-clamp-3">{tarefa.descricao}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    {colunas.map((destino) => (
                      <button key={destino.value} onClick={() => moverStatus(tarefa, destino.value)} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-950">
                        {destino.label}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
