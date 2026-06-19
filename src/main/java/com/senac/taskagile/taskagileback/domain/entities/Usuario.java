package com.senac.taskagile.taskagileback.domain.entities;


import com.senac.taskagile.taskagileback.application.DTO.UsuarioRequest;
import com.senac.taskagile.taskagileback.application.DTO.UsuarioAdmRequest;
import com.senac.taskagile.taskagileback.domain.enuns.EnumStatusUsuario;
import com.senac.taskagile.taskagileback.domain.valueobjects.CPF;
import jakarta.persistence.*;
import lombok.*;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Embedded
    private CPF cpf;

    private String email;

    private String senha;

    private String cargo;

    private String role;

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_id", referencedColumnName = "id")
    private Empresa empresa;


    public Usuario(UsuarioRequest usuario) {
        var usuarioLogado = getUsuarioLogado();
        this.email =usuario.email();
        this.nome = usuario.nome();
        this.cpf = new CPF(usuario.cpf());
        this.senha = usuario.senha();
        this.cargo = usuario.cargo() != null ? usuario.cargo() : "Membro";
        this.role = "ROLE_USER";
        this.empresa = usuarioLogado.getEmpresa();
    }

    public Usuario getUsuarioLogado(){
        return (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public Usuario(UsuarioAdmRequest usuario) {
        this.email =usuario.email();
        this.nome = usuario.nome();
        this.cpf = new CPF(usuario.cpf());
        this.senha = usuario.senha();
        this.cargo = usuario.cargo() != null ? usuario.cargo() : "Líder";
        this.role = "ROLE_ADMIN";
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role));
    }

    @Override
    public @Nullable String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return  this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.status == EnumStatusUsuario.ATIVO;
    }
}
