import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 antialiased flex flex-col">
      
     
      <nav className="fixed top-0 z-[60] w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white font-black text-xl">TA</div>
            <span className="text-xl font-bold tracking-tighter text-slate-950">TaskAgile</span>
          </div>

          <Link
            href="/login"
            className="text-sm font-bold text-slate-600 hover:text-slate-950 transition-colors"
          >
            Entrar
          </Link>
        </div>
      </nav>

    
      <main className="flex-grow flex items-center">
        <section className="relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              
              {/* Lado Esquerdo: Conteúdo */}
              <div className="flex flex-col space-y-8 text-center lg:text-left">
                <h1 className="text-5xl font-black leading-[1.05] tracking-tighter text-slate-950 md:text-7xl">
                  TaskAgile. Organização <br />
                  <span className="text-slate-400">Sem Esforço.</span>
                </h1>

                <p className="max-w-xl text-lg leading-relaxed text-slate-500 md:text-xl antialiased">
                  Aumente a produtividade da sua equipe com a plataforma de gestão 
                  mais intuitiva do mercado. Simples, rápida e eficiente.
                </p>

                <div className="flex justify-center lg:justify-start">
                  <Link
                    href="/login"
                    className="group relative inline-flex items-center justify-center rounded-2xl bg-slate-950 px-10 py-5 text-lg font-black text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-slate-950/30"
                  >
                    Começar Agora
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>

             
              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl border border-slate-200 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    </div>
                  </div>
                  <div className="aspect-[16/10] w-full bg-slate-100">
                    <Image
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                      alt="TaskAgile Dashboard"
                      width={1200}
                      height={750}
                      className="h-full w-full object-cover opacity-80 grayscale-[20%]"
                    />
                  </div>
                </div>
                <div className="absolute -z-10 -top-16 -right-16 h-64 w-64 rounded-full bg-slate-200/40 blur-[80px]" />
              </div>

            </div>
          </div>
        </section>
      </main>

    
      <footer className="py-10 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} TaskAgile. Gestão de projetos simplificada.
          </p>
        </div>
      </footer>
    </div>
  );
}
