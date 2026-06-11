import React from 'react';

export default function Equipe() {
  const membros = [
    { id: 1, nome: "Carlos Oliveira", cargo: "Desenvolvedor Backend" },
    { id: 2, nome: "Ana Souza", cargo: "Designer UI/UX" },
    { id: 3, nome: "Bruno Lima", cargo: "Product Owner" },
  ];

  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black tracking-tighter">Equipe</h1>
        <button className="bg-slate-950 text-white px-4 py-2 rounded-lg text-sm font-bold">
          + Novo Membro
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {membros.map((membro) => (
          <div key={membro.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            {/* Avatar Simples */}
            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
              {membro.nome.charAt(0)}
            </div>
            
            <div>
              <p className="font-bold text-slate-950">{membro.nome}</p>
              <p className="text-sm text-slate-500">{membro.cargo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}