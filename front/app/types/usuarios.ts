
export class Usuario {
    constructor(
        public id: number|null,
        public nome: string,
        public email: string,
        public status: string,
        public cargo: string = "Membro",
        public cpf: string = "",
        public senha: string = "",
        public role?: string
    ) { }
}

export interface UsuarioFormProps {
    usuarioExistente?: Usuario
}
