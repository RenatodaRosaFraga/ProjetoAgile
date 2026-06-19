// src/app/types/projetos.ts

export class Projeto {
  constructor(
    public id: number,
    public nome: string,
    public prazo: string,
    public status: string,
    public cep?: string,
    public logradouro?: string,
    public complemento?: string,
    public bairro?: string,
    public localidade?: string,
    public uf?: string
  ) {}
}

export interface ProjetoFormProps {
  projetoInicial?: Projeto; // opcional, usado para edição
}