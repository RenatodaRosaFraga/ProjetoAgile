package com.senac.taskagile.taskagileback.application.services;

import com.senac.taskagile.taskagileback.application.DTO.ViaCepResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ViaCepService {

    private static final String VIACEP_URL = "https://viacep.com.br/ws/{cep}/json/";

    public ViaCepResponse buscarEnderecoPorCep(String cep) {
        try {
            // Remove caracteres não numéricos do CEP
            String cepLimpo = cep.replaceAll("[^0-9]", "");

            if (cepLimpo.length() != 8) {
                throw new RuntimeException("CEP inválido");
            }

            RestTemplate restTemplate = new RestTemplate();
            ViaCepResponse response = restTemplate.getForObject(
                    VIACEP_URL.replace("{cep}", cepLimpo),
                    ViaCepResponse.class
            );

            if (response != null && response.erro() != null && response.erro()) {
                throw new RuntimeException("CEP não encontrado");
            }

            return response;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar CEP: " + e.getMessage());
        }
    }
}
