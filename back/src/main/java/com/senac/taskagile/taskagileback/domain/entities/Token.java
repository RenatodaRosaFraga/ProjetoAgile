package com.senac.taskagile.taskagileback.domain.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "token")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @ManyToOne
    @JoinColumn(name = "usuario_id",referencedColumnName = "id")
    private Usuario usuario;

    public Token(String token, Usuario usuario){
        this.token = token;
        this.usuario = usuario;
    }


}
