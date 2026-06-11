'use client'
import { Usuario, UsuarioFormProps } from "@/app/types/usuarios";
import api from "@/app/services/api"; // Importando sua instância configurada com interceptors
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios"; // Mantemos apenas para usar o axios.isAxiosError no catch

export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {

    const [usuario, setUsuario] = useState<Usuario>(
        usuarioExistente || new Usuario(null, '', '', "ATIVO", "Membro", '', '')
    );

    const router = useRouter();

    const handleChange = (campo: 'nome' | 'email' | 'cargo' | 'cpf' | 'senha', valor: string) => {
        const valorTratado = campo === 'cpf' ? valor.replace(/\D/g, '') : valor;
        setUsuario(prev =>
            new Usuario(
                prev.id,
                campo === 'nome' ? valorTratado : prev.nome,
                campo === 'email' ? valorTratado : prev.email,
                prev.status,
                campo === 'cargo' ? valorTratado : prev.cargo,
                campo === 'cpf' ? valorTratado : prev.cpf,
                campo === 'senha' ? valorTratado : prev.senha
            )
        );
    };

    const handleSalvar = async () => {
        try {
            if (usuarioExistente) {
                // UPDATE: Usando a instância 'api' que envia o Token
                const dadosResult = await api.put<number>(`/usuarios/${usuarioExistente.id}`, usuario);
              
                if (dadosResult.status === 200) {
                    alert("Usuário editado com sucesso!");
                }
            } else {
                // CREATE: Usando a instância 'api' que envia o Token
                const dadosResult = await api.post<number>('/usuarios', usuario);

                if (dadosResult.status === 200 || dadosResult.status === 201) {
                    alert("Usuário salvo com sucesso!");
                }
            }

            router.push("/usuarios");
            router.refresh(); // Força a atualização da listagem

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    alert("Sua sessão expirou ou você não tem permissão de Administrador.");
                } else {
                    alert("Erro ao salvar usuário: " + (error.response?.data || error.message));
                }
            } else {
                alert("Ocorreu um erro inesperado.");
            }
            console.error("Erro na operação:", error);
        }
    };

    return (
        <form action={handleSalvar} className="w-full">
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">

                    {/* Campo: Nome Completo */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                            Nome completo
                        </label>
                        <input
                            required
                            value={usuario.nome}
                            onChange={(e) => handleChange('nome', e.target.value)}
                            placeholder="Ex: Renato Fraga"
                            className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium"
                        />
                    </div>

                    {/* Campo: Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={usuario.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                            Cargo
                        </label>
                        <input
                            required
                            value={usuario.cargo}
                            onChange={(e) => handleChange('cargo', e.target.value)}
                            placeholder="Ex: Desenvolvedor"
                            className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium"
                        />
                    </div>

                    {!usuarioExistente && (
                        <>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                                    CPF
                                </label>
                                <input
                                    required
                                    value={usuario.cpf}
                                    onChange={(e) => handleChange('cpf', e.target.value)}
                                    inputMode="numeric"
                                    maxLength={11}
                                    placeholder="Somente numeros"
                                    className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                                    Senha
                                </label>
                                <input
                                    required
                                    type="password"
                                    value={usuario.senha}
                                    onChange={(e) => handleChange('senha', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full p-4 rounded-2xl border-none bg-slate-50 text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-950 outline-none transition-all text-sm font-medium"
                                />
                            </div>
                        </>
                    )}

                    {/* Ações */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 py-4 bg-slate-950 hover:bg-slate-800 text-white font-black rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {usuario.id ? "Salvar Alterações" : "Criar Usuário"}
                        </button>

                        <Link
                            href="/usuarios"
                            className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all text-center"
                        >
                            Cancelar
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}
