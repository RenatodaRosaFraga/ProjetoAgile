package com.senac.taskagile.taskagileback.domain.repository;

import com.senac.taskagile.taskagileback.domain.entities.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjetoRepository extends JpaRepository<Projeto,Long> {

    List<Projeto> findByEmpresa_Id(Long empresaId);

    Optional<Projeto> findByIdAndEmpresa_Id(Long id, Long empresaId);

}
