package com.senac.taskagile.taskagileback.domain.repository;

import com.senac.taskagile.taskagileback.domain.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    Optional<Usuario> findByIdAndEmpresa_Id(Long id, Long empresaId);

    List<Usuario> getUsuariosByEmpresa_Id(Long empresa);

    Optional<Usuario> findByEmail(String email);

    boolean existsByEmailAndSenha(String email, String senha);
}
