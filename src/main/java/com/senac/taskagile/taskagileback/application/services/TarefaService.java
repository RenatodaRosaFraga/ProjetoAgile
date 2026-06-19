package com.senac.taskagile.taskagileback.application.services;

import com.senac.taskagile.taskagileback.application.DTO.TarefaRequest;
import com.senac.taskagile.taskagileback.application.DTO.TarefaResponse;
import com.senac.taskagile.taskagileback.application.ports.NotificacaoPort;
import com.senac.taskagile.taskagileback.application.ports.TarefaUseCase;
import com.senac.taskagile.taskagileback.domain.entities.Tarefa;
import com.senac.taskagile.taskagileback.domain.entities.Usuario;
import com.senac.taskagile.taskagileback.domain.enuns.EnumPrioridadeTarefa;
import com.senac.taskagile.taskagileback.domain.enuns.EnumStatusTarefa;
import com.senac.taskagile.taskagileback.domain.repository.ProjetoRepository;
import com.senac.taskagile.taskagileback.domain.repository.TarefaRepository;
import com.senac.taskagile.taskagileback.domain.repository.UsuarioRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TarefaService implements TarefaUseCase {

    private final TarefaRepository tarefaRepository;
    private final ProjetoRepository projetoRepository;
    private final UsuarioRepository usuarioRepository;
    private final NotificacaoPort notificacaoPort;

    public TarefaService(TarefaRepository tarefaRepository,
                         ProjetoRepository projetoRepository,
                         UsuarioRepository usuarioRepository,
                         NotificacaoPort notificacaoPort) {
        this.tarefaRepository = tarefaRepository;
        this.projetoRepository = projetoRepository;
        this.usuarioRepository = usuarioRepository;
        this.notificacaoPort = notificacaoPort;
    }

    @Override
    public List<TarefaResponse> listarTodos() {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return tarefaRepository.findByEmpresa_Id(usuarioLogado.getEmpresa().getId())
                .stream()
                .map(TarefaResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public TarefaResponse buscarPorId(Long id) {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return tarefaRepository.findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .map(TarefaResponse::new)
                .orElse(null);
    }

    @Override
    public Long salvar(TarefaRequest request) {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        var projeto = projetoRepository.findByIdAndEmpresa_Id(request.projetoId(), usuarioLogado.getEmpresa().getId())
                .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));
        var responsavel = usuarioRepository.findByIdAndEmpresa_Id(request.membroResponsavelId(), usuarioLogado.getEmpresa().getId())
                .orElseThrow(() -> new RuntimeException("Membro não encontrado"));

        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo(request.titulo());
        tarefa.setDescricao(request.descricao());
        tarefa.setPrioridade(request.prioridade());
        tarefa.setStatus(request.status() == null ? EnumStatusTarefa.PENDENTE : request.status());
        tarefa.setProjeto(projeto);
        tarefa.setUsuarioResponsavel(responsavel);
        tarefa.setEmpresa(usuarioLogado.getEmpresa());

        var saved = tarefaRepository.save(tarefa);
        if (saved.getPrioridade() == EnumPrioridadeTarefa.URGENTE) {
            notificacaoPort.registrarTarefaUrgente(saved);
        }

        return saved.getId();
    }

    @Override
    public boolean alterar(Long id, TarefaRequest request) {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var tarefa = tarefaRepository.findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId()).orElse(null);
        if (tarefa == null) return false;

        var projeto = projetoRepository.findByIdAndEmpresa_Id(request.projetoId(), usuarioLogado.getEmpresa().getId())
                .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));
        var responsavel = usuarioRepository.findByIdAndEmpresa_Id(request.membroResponsavelId(), usuarioLogado.getEmpresa().getId())
                .orElseThrow(() -> new RuntimeException("Membro não encontrado"));

        tarefa.setTitulo(request.titulo());
        tarefa.setDescricao(request.descricao());
        tarefa.setPrioridade(request.prioridade());
        if (request.status() != null) {
            tarefa.setStatus(request.status());
        }
        tarefa.setProjeto(projeto);
        tarefa.setUsuarioResponsavel(responsavel);
        tarefaRepository.save(tarefa);
        return true;
    }

    @Override
    public boolean alterarStatus(Long id, String status) {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var tarefa = tarefaRepository.findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId()).orElse(null);
        if (tarefa == null) return false;
        tarefa.setStatus(EnumStatusTarefa.valueOf(status));
        tarefaRepository.save(tarefa);
        return true;
    }

    @Override
    public boolean deletar(Long id) {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var tarefa = tarefaRepository.findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId()).orElse(null);
        if (tarefa == null) return false;
        tarefaRepository.delete(tarefa);
        return true;
    }
}
