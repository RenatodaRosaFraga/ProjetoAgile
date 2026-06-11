package com.senac.taskagile.taskagileback.presentation;

import com.senac.taskagile.taskagileback.application.DTO.TarefaRequest;
import com.senac.taskagile.taskagileback.application.DTO.TarefaResponse;
import com.senac.taskagile.taskagileback.application.ports.TarefaUseCase;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefas")
@Tag(name = "Servico de Tarefas", description = "CRUD de tarefas do workspace")
public class TarefaController {

    private final TarefaUseCase tarefaService;

    public TarefaController(TarefaUseCase tarefaService) {
        this.tarefaService = tarefaService;
    }

    @GetMapping
    public ResponseEntity<List<TarefaResponse>> listar() {
        return ResponseEntity.ok(tarefaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Long id) {
        var tarefa = tarefaService.buscarPorId(id);
        return tarefa != null ? ResponseEntity.ok(tarefa) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Long> salvar(@RequestBody TarefaRequest request) {
        return ResponseEntity.ok(tarefaService.salvar(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> alterar(@PathVariable Long id, @RequestBody TarefaRequest request) {
        return tarefaService.alterar(id, request) ? ResponseEntity.ok("Atualizado com sucesso!") : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> alterarStatus(@PathVariable Long id, @RequestBody String status) {
        return tarefaService.alterarStatus(id, status) ? ResponseEntity.ok("Status atualizado!") : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        return tarefaService.deletar(id) ? ResponseEntity.ok("Removido com sucesso!") : ResponseEntity.notFound().build();
    }
}
