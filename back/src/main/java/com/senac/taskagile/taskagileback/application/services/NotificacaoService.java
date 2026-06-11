package com.senac.taskagile.taskagileback.application.services;

import com.senac.taskagile.taskagileback.application.DTO.NotificacaoResponse;
import com.senac.taskagile.taskagileback.application.ports.NotificacaoPort;
import com.senac.taskagile.taskagileback.domain.entities.Notificacao;
import com.senac.taskagile.taskagileback.domain.entities.Tarefa;
import com.senac.taskagile.taskagileback.domain.repository.NotificacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificacaoService implements NotificacaoPort {

    private final NotificacaoRepository notificacaoRepository;

    public NotificacaoService(NotificacaoRepository notificacaoRepository) {
        this.notificacaoRepository = notificacaoRepository;
    }

    @Override
    public void registrarTarefaUrgente(Tarefa tarefa) {
        Notificacao notificacao = new Notificacao();
        notificacao.setMensagem("Tarefa urgente criada: " + tarefa.getTitulo());
        notificacao.setTarefa(tarefa);
        notificacao.setEmpresa(tarefa.getEmpresa());
        notificacaoRepository.save(notificacao);
        System.out.println("[NOTIFICACAO] " + notificacao.getMensagem());
    }

    @Override
    public List<NotificacaoResponse> listarPorEmpresa(Long empresaId) {
        return notificacaoRepository.findByEmpresa_IdOrderByDataCriacaoDesc(empresaId)
                .stream()
                .map(NotificacaoResponse::new)
                .collect(Collectors.toList());
    }
}
