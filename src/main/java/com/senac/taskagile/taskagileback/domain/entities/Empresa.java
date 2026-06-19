package com.senac.taskagile.taskagileback.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "usuarios")
@ToString(exclude = "usuarios")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String RazaoSocial;

    private String NomeFantasia;

    private String CNPJ;

    @OneToMany(mappedBy = "empresa")
    private List<Usuario> usuarios;

}
