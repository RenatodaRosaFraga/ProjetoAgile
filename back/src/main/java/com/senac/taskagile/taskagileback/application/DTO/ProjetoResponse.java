package com.senac.taskagile.taskagileback.application.DTO;

import com.senac.taskagile.taskagileback.domain.entities.Projeto;

public record ProjetoResponse(
        Long id,
        String nome,
        String prazo,
        String status,
        String cep,
        String logradouro,
        String complemento,
        String bairro,
        String localidade,
        String uf
) {
    public ProjetoResponse(Projeto projeto) {
        this(
                projeto.getId(),
                projeto.getNome(),
                projeto.getPrazo(),
                projeto.getStatus().toString(),
                projeto.getCep(),
                projeto.getLogradouro(),
                projeto.getComplemento(),
                projeto.getBairro(),
                projeto.getLocalidade(),
                projeto.getUf()
        );
    }
}
