package com.senac.taskagile.taskagileback.application.DTO;

import com.senac.taskagile.taskagileback.domain.entities.Tarefa;

public record TarefaResponse(
        Long id,
        String titulo,
        String descricao,
        String prioridade,
        String status,
        Long projetoId,
        String projetoNome,
        Long membroResponsavelId,
        String membroResponsavelNome
) {
    public TarefaResponse(Tarefa tarefa) {
        this(
                tarefa.getId(),
                tarefa.getTitulo(),
                tarefa.getDescricao(),
                tarefa.getPrioridade().name(),
                tarefa.getStatus().name(),
                tarefa.getProjeto().getId(),
                tarefa.getProjeto().getNome(),
                tarefa.getUsuarioResponsavel().getId(),
                tarefa.getUsuarioResponsavel().getNome()
        );
    }
}
