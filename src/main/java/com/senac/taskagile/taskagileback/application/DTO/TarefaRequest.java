package com.senac.taskagile.taskagileback.application.DTO;

import com.senac.taskagile.taskagileback.domain.enuns.EnumPrioridadeTarefa;
import com.senac.taskagile.taskagileback.domain.enuns.EnumStatusTarefa;

public record TarefaRequest(
        String titulo,
        String descricao,
        EnumPrioridadeTarefa prioridade,
        EnumStatusTarefa status,
        Long projetoId,
        Long membroResponsavelId
) {
}
