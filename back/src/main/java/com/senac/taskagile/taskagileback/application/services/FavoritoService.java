package com.senac.taskagile.taskagileback.application.services;

import com.senac.taskagile.taskagileback.application.DTO.FavoritoResponse;
import com.senac.taskagile.taskagileback.domain.entities.Favorito;
import com.senac.taskagile.taskagileback.domain.entities.Usuario;
import com.senac.taskagile.taskagileback.domain.repository.FavoritoRepository;
import com.senac.taskagile.taskagileback.domain.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private ProjetoRepository projetoRepository;

    public List<FavoritoResponse> ListarFavoritosPorUsuario(Usuario usuario) {
        try {
            return favoritoRepository.findByUsuario(usuario)
                    .stream()
                    .map(FavoritoResponse::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long AdicionarFavorito(Usuario usuario, Long projetoId) {
        try {
            // Multilocação: só permite favoritar projeto do próprio workspace/empresa
            var projeto = projetoRepository.findByIdAndEmpresa_Id(projetoId, usuario.getEmpresa().getId()).orElse(null);
            if (projeto == null) {
                throw new RuntimeException("Projeto não encontrado");
            }

            // Verifica se já existe
            if (favoritoRepository.existsByUsuarioAndProjeto(usuario, projeto)) {
                throw new RuntimeException("Projeto já está nos favoritos");
            }

            Favorito favorito = new Favorito();
            favorito.setUsuario(usuario);
            favorito.setProjeto(projeto);
            return favoritoRepository.save(favorito).getId();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean RemoverFavorito(Usuario usuario, Long projetoId) {
        try {
            var projeto = projetoRepository.findByIdAndEmpresa_Id(projetoId, usuario.getEmpresa().getId()).orElse(null);
            if (projeto == null) {
                return false;
            }

            var favorito = favoritoRepository.findByUsuarioAndProjeto(usuario, projeto).orElse(null);
            if (favorito == null) {
                return false;
            }

            favoritoRepository.delete(favorito);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean IsFavorito(Usuario usuario, Long projetoId) {
        try {
            var projeto = projetoRepository.findByIdAndEmpresa_Id(projetoId, usuario.getEmpresa().getId()).orElse(null);
            if (projeto == null) {
                return false;
            }
            return favoritoRepository.existsByUsuarioAndProjeto(usuario, projeto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
