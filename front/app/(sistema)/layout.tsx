'use client';

import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/app/redux/hooks";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { usuario, token, isHydrated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // Só redireciona após o hydrate terminar
    if (isHydrated && (!usuario || !token)) {
      router.push('/login');
    }
  }, [usuario, token, isHydrated, router]);

  // Enquanto não carregou os cookies, não renderiza nada
  if (!isHydrated) {
    return null;
  }

  // Se já carregou mas não tem usuário, também não renderiza (vai redirecionar)
  if (!usuario || !token) {
    return null;
  }

  return <>{children}</>;
}

export default function SistemaLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="relative min-h-screen bg-slate-50">
        <Sidebar />

        <div className="flex flex-col min-h-screen md:pl-64 transition-all duration-300">
          <Header />

          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
              {children}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </AuthGuard>
  );
}
