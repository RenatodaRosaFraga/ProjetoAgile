package com.senac.taskagile.taskagileback.presentation;

import com.senac.taskagile.taskagileback.application.DTO.NotificacaoResponse;
import com.senac.taskagile.taskagileback.application.ports.NotificacaoPort;
import com.senac.taskagile.taskagileback.domain.entities.Usuario;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notificacoes")
@Tag(name = "Notificacoes", description = "Lista notificações do workspace")
public class NotificacaoController {

    private final NotificacaoPort notificacaoPort;

    public NotificacaoController(NotificacaoPort notificacaoPort) {
        this.notificacaoPort = notificacaoPort;
    }

    @GetMapping
    public ResponseEntity<List<NotificacaoResponse>> listar(@AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(notificacaoPort.listarPorEmpresa(usuario.getEmpresa().getId()));
    }
}
