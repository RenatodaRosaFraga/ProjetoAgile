package com.senac.taskagile.taskagileback.domain.repository;

import com.senac.taskagile.taskagileback.domain.entities.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    List<Notificacao> findByEmpresa_IdOrderByDataCriacaoDesc(Long empresaId);
}
