package com.senac.taskagile.taskagileback.application.ports;

import com.senac.taskagile.taskagileback.application.DTO.TarefaRequest;
import com.senac.taskagile.taskagileback.application.DTO.TarefaResponse;

import java.util.List;

public interface TarefaUseCase {
    List<TarefaResponse> listarTodos();
    TarefaResponse buscarPorId(Long id);
    Long salvar(TarefaRequest request);
    boolean alterar(Long id, TarefaRequest request);
    boolean alterarStatus(Long id, String status);
    boolean deletar(Long id);
}
