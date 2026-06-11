package com.senac.taskagile.taskagileback.application.ports;

import com.senac.taskagile.taskagileback.application.DTO.NotificacaoResponse;
import com.senac.taskagile.taskagileback.domain.entities.Tarefa;

import java.util.List;

public interface NotificacaoPort {
    void registrarTarefaUrgente(Tarefa tarefa);
    List<NotificacaoResponse> listarPorEmpresa(Long empresaId);
}
