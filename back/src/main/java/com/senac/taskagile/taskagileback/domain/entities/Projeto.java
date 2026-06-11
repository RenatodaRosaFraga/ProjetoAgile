package com.senac.taskagile.taskagileback.domain.entities;

import com.senac.taskagile.taskagileback.domain.enuns.EnumStatusProjeto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "projeto")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String prazo;

    private String cep;
    private String logradouro;
    private String complemento;
    private String bairro;
    private String localidade;
    private String uf;

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPrazo() {
        return prazo;
    }

    public void setPrazo(String prazo) {
        this.prazo = prazo;
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EnumStatusProjeto status = EnumStatusProjeto.ATIVO;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_id", referencedColumnName = "id")
    private Empresa empresa;

    // Adicione este método abaixo para garantir que o status nunca seja nulo antes de salvar
    @PrePersist
    public void prePersist() {
        if (this.status == null) {
            this.status = EnumStatusProjeto.ATIVO;
        }
    }

}
