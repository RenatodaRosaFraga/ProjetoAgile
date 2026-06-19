package com.senac.taskagile.taskagileback.application.DTO;

public record BootstrapRequest(
        String workspaceNome,
        String nome,
        String email,
        String senha,
        String cpf
) {
}
