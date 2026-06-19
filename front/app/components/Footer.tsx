export default function Footer(){
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-white py-6 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          
          {/* Texto de Copyright */}
          <p className="text-sm text-slate-500 order-2 md:order-1">
            &copy; {currentYear} <span className="font-medium text-slate-900">TaskAgile</span>. 
            Todos os direitos reservados.
          </p>

          {/* Links de Navegação */}
          <div className="flex items-center gap-8 order-1 md:order-2">
            <a 
              href="#" 
              className="group flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {/* Ícone W3C - Suporte */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-slate-600">
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M4.8 4.8l3.1 3.1" />
                <path d="M16.1 16.1l3.1 3.1" />
                <path d="M16.1 7.9l3.1 -3.1" />
                <path d="M4.8 19.2l3.1 -3.1" />
              </svg>
              Suporte
            </a>

            <a 
              href="#" 
              className="group flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {/* Ícone W3C - Termos */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-slate-600">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
              Termos de uso
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}