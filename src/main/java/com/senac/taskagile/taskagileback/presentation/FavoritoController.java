package com.senac.taskagile.taskagileback.presentation;

import com.senac.taskagile.taskagileback.application.DTO.FavoritoRequest;
import com.senac.taskagile.taskagileback.application.DTO.FavoritoResponse;
import com.senac.taskagile.taskagileback.application.services.FavoritoService;
import com.senac.taskagile.taskagileback.domain.entities.Usuario;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favoritos")
@Tag(description = "Servico para gestao de favoritos", name = "Servico de Favoritos")
public class FavoritoController {

    private final FavoritoService favoritoService;

    public FavoritoController(FavoritoService favoritoService) {
        this.favoritoService = favoritoService;
    }

    @GetMapping
    public ResponseEntity<List<FavoritoResponse>> listarFavoritos(@AuthenticationPrincipal Usuario usuario) {
        var favoritos = favoritoService.ListarFavoritosPorUsuario(usuario);
        return ResponseEntity.ok(favoritos);
    }

    @PostMapping
    public ResponseEntity<Long> adicionarFavorito(
            @AuthenticationPrincipal Usuario usuario,
            @RequestBody FavoritoRequest request) {
        try {
            var id = favoritoService.AdicionarFavorito(usuario, request.projetoId());
            return ResponseEntity.ok(id);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{projetoId}")
    public ResponseEntity<?> removerFavorito(
            @AuthenticationPrincipal Usuario usuario,
            @PathVariable Long projetoId) {
        var removido = favoritoService.RemoverFavorito(usuario, projetoId);
        return removido ? ResponseEntity.ok("Removido com sucesso!") : ResponseEntity.notFound().build();
    }

    @GetMapping("/verificar/{projetoId}")
    public ResponseEntity<Boolean> verificarFavorito(
            @AuthenticationPrincipal Usuario usuario,
            @PathVariable Long projetoId) {
        var isFavorito = favoritoService.IsFavorito(usuario, projetoId);
        return ResponseEntity.ok(isFavorito);
    }
}
