package com.senac.taskagile.taskagileback.application.DTO;

public record UsuarioRequest(
        String nome,
        String email,
        String senha,
        String cpf,
        String cargo
) {
}
