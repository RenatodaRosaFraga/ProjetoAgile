package com.senac.taskagile.taskagileback.infra.config;

import com.senac.taskagile.taskagileback.domain.repository.TokenRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class TokenCleanupRunner implements CommandLineRunner {

    private final TokenRepository tokenRepository;

    public TokenCleanupRunner(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Limpa todos os tokens ao iniciar o backend
        // Isso simula tokens "em memória" que são perdidos ao reiniciar
        tokenRepository.deleteAll();
        System.out.println("=== TOKENS LIMPOS AO INICIAR O BACKEND ===");
    }
}
