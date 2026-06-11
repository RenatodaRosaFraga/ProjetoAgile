package com.senac.taskagile.taskagileback.application.DTO;

import com.senac.taskagile.taskagileback.domain.entities.Favorito;

import java.time.LocalDateTime;

public record FavoritoResponse(
        Long id,
        Long usuarioId,
        ProjetoResponse projeto,
        LocalDateTime dataCriacao
) {
    public FavoritoResponse(Favorito favorito) {
        this(
                favorito.getId(),
                favorito.getUsuario().getId(),
                new ProjetoResponse(favorito.getProjeto()),
                favorito.getDataCriacao()
        );
    }
}
