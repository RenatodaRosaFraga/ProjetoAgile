'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import api from "@/app/services/api";

// Tipagem do Projeto
export interface Projeto {
  id: number | null;
  nome: string;
  prazo: string;
  status: string;
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}

// Props do Formulário
interface ProjetoFormProps {
  projetoInicial?: Projeto; // opcional, usado para edição
}

export default function ProjetoForm({ projetoInicial }: ProjetoFormProps) {
  const router = useRouter();

  const [projeto, setProjeto] = useState<Projeto>(
    projetoInicial || { id: null, nome: "", prazo: "", status: "ATIVO", cep: "" }
  );
  const [enviando, setEnviando] = useState(false);

  const handlerChange = (campo: keyof Projeto, valor: string) => {
    setProjeto(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      if (projeto.id) {
        // UPDATE
        const response = await api.put(`/projetos/${projeto.id}`, projeto);
        if (response.status === 200) {
          alert("Projeto atualizado com sucesso!");
        }
      } else {
        // CREATE
        const response = await api.post("/projetos", projeto);
        if (response.status === 200 || response.status === 201) {
          alert("Projeto criado com sucesso! ID: " + response.data);
        }
      }

      router.push("/projetos");
      router.refresh();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Erro detalhado:", error.response?.data || error.message);
      } else {
        console.error("Erro inesperado:", error);
      }
      alert("Erro ao salvar no servidor. Verifique se o backend está rodando.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900">
            {projeto.id ? "Editar Projeto" : "Novo Projeto"}
          </h2>
          <p className="text-sm text-slate-500">
            {projeto.id
              ? "Atualize os dados do projeto abaixo."
              : "Preencha os dados para começar."}
          </p>
        </div>

        {/* Campo: Nome */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Nome do Projeto
          </label>
          <input
            required
            disabled={enviando}
            value={projeto.nome}
            onChange={(e) => handlerChange("nome", e.target.value)}
            placeholder="Ex: Redesign do App Mobile"
            className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all placeholder:text-slate-400 text-sm font-medium disabled:opacity-50"
          />
        </div>

        {/* Campo: Prazo */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Prazo de Entrega
          </label>
          <input
            required
            disabled={enviando}
            type="date"
            value={projeto.prazo}
            onChange={(e) => handlerChange("prazo", e.target.value)}
            className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium disabled:opacity-50"
          />
        </div>

        {/* Campo: CEP */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            CEP da Localização
          </label>
          <input
            disabled={enviando}
            value={projeto.cep || ""}
            onChange={(e) => handlerChange("cep", e.target.value)}
            placeholder="Ex: 01310-100"
            maxLength={9}
            className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all placeholder:text-slate-400 text-sm font-medium disabled:opacity-50"
          />
          <p className="text-xs text-slate-400 ml-1">
            O endereço será preenchido automaticamente ao salvar
          </p>
        </div>

        {/* Exibir endereço se já existir */}
        {projeto.logradouro && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
              Endereço Cadastrado
            </p>
            <p className="text-sm text-slate-700">
              {projeto.logradouro}
              {projeto.complemento && `, ${projeto.complemento}`}
              <br />
              {projeto.bairro} - {projeto.localidade}/{projeto.uf}
            </p>
          </div>
        )}

        {/* Ações */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={enviando}
            className="flex-1 py-4 bg-slate-950 hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-slate-950/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:bg-slate-400"
          >
            {enviando
              ? "Salvando..."
              : projeto.id
              ? "Salvar Alterações"
              : "Criar Projeto"}
          </button>

          <Link
            href="/projetos"
            className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all active:scale-[0.98] text-center"
          >
            Cancelar
          </Link>
        </div>
      </div>
    </form>
  );
}
