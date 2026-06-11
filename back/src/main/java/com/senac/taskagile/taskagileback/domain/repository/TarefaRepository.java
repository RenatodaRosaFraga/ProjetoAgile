package com.senac.taskagile.taskagileback.domain.repository;

import com.senac.taskagile.taskagileback.domain.entities.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    List<Tarefa> findByEmpresa_Id(Long empresaId);
    Optional<Tarefa> findByIdAndEmpresa_Id(Long id, Long empresaId);
}
