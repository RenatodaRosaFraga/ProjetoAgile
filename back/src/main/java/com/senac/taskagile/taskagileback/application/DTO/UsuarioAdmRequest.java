package com.senac.taskagile.taskagileback.application.DTO;

public record UsuarioAdmRequest(
        String nome,
        String email,
        String senha,
        String secretKey,
        String cpf,
        String cargo
) {

}
