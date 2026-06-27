package com.senac.taskagile.taskagileback.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@Tag(name = "Test", description = "Endpoint para demonstração de segurança")
public class TestController {

    @GetMapping
    @Operation(summary = "Endpoint de teste", description = "Não requer autenticação - usado para demonstrar desabilitação de segurança")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("✅ Endpoint acessível sem autenticação! A segurança foi desabilitada com sucesso.");
    }
}
