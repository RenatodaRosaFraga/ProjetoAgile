package com.senac.taskagile.taskagileback.application.services;

import com.senac.taskagile.taskagileback.application.DTO.*;
import com.senac.taskagile.taskagileback.domain.entities.Usuario;
import com.senac.taskagile.taskagileback.domain.entities.Empresa;
import com.senac.taskagile.taskagileback.domain.repository.EmpresaRepository;
import com.senac.taskagile.taskagileback.domain.repository.UsuarioRepository;
import com.senac.taskagile.taskagileback.application.DTO.BootstrapRequest;
import com.senac.taskagile.taskagileback.application.DTO.BootstrapResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Value("${spring.secretkey}")
    private String secret;

    public boolean ValidaUsuarioSenha(LoginRequest loginRequest) {
        try {

            return usuarioRepository.existsByEmailAndSenha(loginRequest.email(), loginRequest.senha());

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public List<UsuarioResponse> ListarTodos() {
        try{
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (usuarioLogado.getEmpresa() == null) {
                throw new IllegalArgumentException("Usuário não possui empresa vinculada.");
            }

            // Multilocação: lista somente os membros do mesmo workspace/empresa do usuário logado
            return usuarioRepository.getUsuariosByEmpresa_Id(usuarioLogado.getEmpresa().getId())
                    .stream()
                    .map(UsuarioResponse::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public UsuarioResponse BuscarUsuarioLogado(Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        try{
            return  usuarioRepository.findById(usuario.getId())
                    .stream().map(UsuarioResponse::new).findFirst().orElse(null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



    public UsuarioResponse BuscarUsuarioPorId(Long id) {
        try{

            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            var empresa = usuarioLogado.getEmpresa();
            if (empresa == null) {
                return null;
            }

            // Multilocação: mesmo o ADMIN só enxerga usuários do próprio workspace/empresa
            var usuario = usuarioRepository.findByIdAndEmpresa_Id(id, empresa.getId()).orElse(null);
            if (usuario == null) {
                return null;
            }
            return new UsuarioResponse(usuario);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }


    public boolean AterarUsuario(Long id, UsuarioRequest usuario) {

        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (usuarioLogado.getEmpresa() == null) {
            return false;
        }

        // Multilocação: só altera usuário pertencente ao próprio workspace/empresa
        var usuarioBanco = usuarioRepository.findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId()).orElse(null);

        if (usuarioBanco != null) {
            usuarioBanco.setEmail(usuario.email());
            usuarioBanco.setNome(usuario.nome());
            usuarioBanco.setSenha(usuario.senha());
            usuarioBanco.setCargo(usuario.cargo());

            usuarioRepository.save(usuarioBanco);

            return true;
        }

        return false;
    }

    public Long SalvarUsuario(UsuarioRequest usuario) {
        try {
            return usuarioRepository.save(new Usuario(usuario)).getId();
        }catch (IllegalArgumentException e){
            throw e;
        }catch (Exception e){
            throw new RuntimeException(e);
        }

    }

    public Long SalvarUsuarioAdm(UsuarioAdmRequest usuario) {
        try {

            if(usuario.secretKey().equals( secret)) {
                return usuarioRepository.save(new Usuario(usuario)).getId();
            }else
            {
                return 0L;
            }

        }catch (IllegalArgumentException e){
            throw e;
        }catch (Exception e){
            throw new RuntimeException(e);
        }

    }

    public boolean AlterarStatus(Long id, AlterarStatusRequest statusRequest) {

        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (usuarioLogado.getEmpresa() == null) {
            return false;
        }

        // Multilocação: só altera status de usuário do próprio workspace/empresa
        var usuarioBanco = usuarioRepository.findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId()).orElse(null);

        if (usuarioBanco != null){

            usuarioBanco.setStatus(statusRequest.status());
            usuarioRepository.save(usuarioBanco);

            return true;
        }
        return false;
    }

    public UsuarioResponse BuscarPorEmail(String email) {
        try {
            return usuarioRepository.findByEmail(email)
                    .map(UsuarioResponse::new)
                    .orElse(null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public BootstrapResponse bootstrap(BootstrapRequest request) {
        Empresa empresa = new Empresa();
        empresa.setNomeFantasia(request.workspaceNome());
        empresa.setRazaoSocial(request.workspaceNome());
        empresa.setCNPJ("00000000000000");
        empresa = empresaRepository.save(empresa);

        Usuario usuario = new Usuario();
        usuario.setNome(request.nome());
        usuario.setEmail(request.email());
        usuario.setSenha(request.senha());
        usuario.setCpf(new com.senac.taskagile.taskagileback.domain.valueobjects.CPF(request.cpf()));
        usuario.setRole("ROLE_ADMIN");
        usuario.setCargo("Líder");
        usuario.setEmpresa(empresa);

        var salvo = usuarioRepository.save(usuario);

        return new BootstrapResponse(salvo.getEmpresa().getId(), salvo.getId());
    }
}
