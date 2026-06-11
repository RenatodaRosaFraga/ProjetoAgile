package com.senac.taskagile.taskagileback.application.DTO;

public record ProjetoRequest(
        String nome,
        String prazo,
        String cep
) {
}
