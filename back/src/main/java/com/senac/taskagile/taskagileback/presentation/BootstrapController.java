package com.senac.taskagile.taskagileback.presentation;

import com.senac.taskagile.taskagileback.application.DTO.BootstrapRequest;
import com.senac.taskagile.taskagileback.application.DTO.BootstrapResponse;
import com.senac.taskagile.taskagileback.application.services.UsuarioService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bootstrap")
@Tag(name = "Bootstrap", description = "Cria a primeira empresa e o primeiro administrador")
public class BootstrapController {

    private final UsuarioService usuarioService;

    public BootstrapController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<BootstrapResponse> bootstrap(@RequestBody BootstrapRequest request) {
        return ResponseEntity.ok(usuarioService.bootstrap(request));
    }
}
