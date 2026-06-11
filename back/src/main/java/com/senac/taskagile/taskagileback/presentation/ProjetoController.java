package com.senac.taskagile.taskagileback.presentation;

import com.senac.taskagile.taskagileback.application.DTO.AlterarStatusProjetoRequest;
import com.senac.taskagile.taskagileback.application.DTO.ProjetoRequest;
import com.senac.taskagile.taskagileback.application.DTO.ProjetoResponse;
import com.senac.taskagile.taskagileback.application.services.ProjetoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projetos")
@Tag(description = "Servico para gestao de projetos simplificados", name = "Servico de Projetos")
public class ProjetoController {

    private final ProjetoService projetoService;

    public ProjetoController(ProjetoService projetoService) {
        this.projetoService = projetoService;
    }

    @GetMapping
    public ResponseEntity<List<ProjetoResponse>> listarTodos() {
        var projetos = projetoService.ListarTodos();
        return ResponseEntity.ok(projetos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        var projeto = projetoService.BuscarProjetoPorId(id);
        return projeto != null ? ResponseEntity.ok(projeto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Long> salvar(@RequestBody ProjetoRequest projeto) {
        return ResponseEntity.ok(projetoService.SalvarProjeto(projeto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody ProjetoRequest projetoAtualizado) {
        var alterado = projetoService.AlterarProjeto(id, projetoAtualizado);
        return alterado ? ResponseEntity.ok("Atualizado com sucesso!") : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/AlterarStatus")
    public ResponseEntity<?> alterarStatus(@PathVariable Long id, @RequestBody AlterarStatusProjetoRequest statusRequest) {
        var alterado = projetoService.AlterarStatusProjeto(id, statusRequest.status());
        return alterado ? ResponseEntity.ok("atualizado com sucesso!") : ResponseEntity.notFound().build();
    }
}
