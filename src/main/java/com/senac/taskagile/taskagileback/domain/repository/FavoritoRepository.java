package com.senac.taskagile.taskagileback.domain.repository;

import com.senac.taskagile.taskagileback.domain.entities.Favorito;
import com.senac.taskagile.taskagileback.domain.entities.Projeto;
import com.senac.taskagile.taskagileback.domain.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {

    List<Favorito> findByUsuario(Usuario usuario);

    Optional<Favorito> findByUsuarioAndProjeto(Usuario usuario, Projeto projeto);

    boolean existsByUsuarioAndProjeto(Usuario usuario, Projeto projeto);
}
