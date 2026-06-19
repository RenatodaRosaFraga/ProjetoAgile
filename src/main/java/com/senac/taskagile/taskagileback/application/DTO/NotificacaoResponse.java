package com.senac.taskagile.taskagileback.application.DTO;

import com.senac.taskagile.taskagileback.domain.entities.Notificacao;

import java.time.LocalDateTime;

public record NotificacaoResponse(
        Long id,
        String mensagem,
        LocalDateTime dataCriacao,
        boolean lida,
        Long tarefaId,
        String tarefaTitulo
) {
    public NotificacaoResponse(Notificacao notificacao) {
        this(
                notificacao.getId(),
                notificacao.getMensagem(),
                notificacao.getDataCriacao(),
                notificacao.isLida(),
                notificacao.getTarefa().getId(),
                notificacao.getTarefa().getTitulo()
        );
    }
}
