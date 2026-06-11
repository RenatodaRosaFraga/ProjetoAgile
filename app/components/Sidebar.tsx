'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white p-4 hidden md:flex">

      {/* Logo: h-16 para alinhar horizontalmente com o Header */}
      <div className="flex h-16 items-center px-4 mb-4">
        <div className="w-full rounded-2xl bg-slate-50 border border-slate-100 p-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-0.5">Portal</span>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">TaskAgile</h2>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        <Link
          href="/home"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive('/home')
              ? 'bg-slate-950 text-white shadow-lg'
              : 'text-slate-500 hover:bg-slate-50'
            }`}
        >
          <Icons.Home /> Home
        </Link>
        <Link
          href="/usuarios"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive('/usuario')
              ? 'bg-slate-950 text-white shadow-lg'
              : 'text-slate-500 hover:bg-slate-50'
            }`}
        >
          <Icons.Users /> Usuários
        </Link>
        <Link
          href="/projetos"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive('/projetos')
              ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20'
              : 'text-slate-500 hover:bg-slate-50'
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          Projetos
        </Link>
        <Link
          href="/tarefas"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive('/tarefas') || isActive('/board')
              ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20'
              : 'text-slate-500 hover:bg-slate-50'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          Tarefas
        </Link>
      </nav>

      <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-medium text-center uppercase">
        v1.0.2 - TaskAgile
      </div>
    </aside>
  );
}

// Subcomponente de Ícones para manter o código limpo
const Icons = {
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  )
};
