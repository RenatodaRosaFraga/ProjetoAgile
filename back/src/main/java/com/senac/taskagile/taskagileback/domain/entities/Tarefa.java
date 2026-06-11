package com.senac.taskagile.taskagileback.domain.entities;

import com.senac.taskagile.taskagileback.domain.enuns.EnumPrioridadeTarefa;
import com.senac.taskagile.taskagileback.domain.enuns.EnumStatusTarefa;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tarefa")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    @Column(length = 2000)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EnumPrioridadeTarefa prioridade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EnumStatusTarefa status = EnumStatusTarefa.PENDENTE;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "projeto_id", referencedColumnName = "id", nullable = false)
    private Projeto projeto;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_responsavel_id", referencedColumnName = "id", nullable = false)
    private Usuario usuarioResponsavel;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_id", referencedColumnName = "id", nullable = false)
    private Empresa empresa;

    @PrePersist
    public void prePersist() {
        if (this.status == null) {
            this.status = EnumStatusTarefa.PENDENTE;
        }
    }
}
