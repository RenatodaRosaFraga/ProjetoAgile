package com.senac.taskagile.taskagileback.application.services;

import com.senac.taskagile.taskagileback.application.DTO.ProjetoRequest;
import com.senac.taskagile.taskagileback.application.DTO.ProjetoResponse;
import com.senac.taskagile.taskagileback.domain.entities.Usuario;
import com.senac.taskagile.taskagileback.domain.entities.Projeto;
import com.senac.taskagile.taskagileback.domain.enuns.EnumStatusProjeto;
import com.senac.taskagile.taskagileback.domain.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private ViaCepService viaCepService;

    public List<ProjetoResponse> ListarTodos() {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (usuarioLogado.getEmpresa() == null) {
                throw new IllegalArgumentException("Usuário não possui empresa vinculada.");
            }

            return projetoRepository.findByEmpresa_Id(usuarioLogado.getEmpresa().getId())
                    .stream()
                    .map(ProjetoResponse::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ProjetoResponse BuscarProjetoPorId(Long id) {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            var projeto = projetoRepository.findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId()).orElse(null);
            if (projeto == null) {
                return null;
            }
            return new ProjetoResponse(projeto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long SalvarProjeto(ProjetoRequest projetoRequest) {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            Projeto projeto = new Projeto();
            projeto.setNome(projetoRequest.nome());
            projeto.setPrazo(projetoRequest.prazo());
            projeto.setStatus(EnumStatusProjeto.ATIVO);
            projeto.setEmpresa(usuarioLogado.getEmpresa());

            if (projetoRequest.cep() != null && !projetoRequest.cep().isEmpty()) {
                var endereco = viaCepService.buscarEnderecoPorCep(projetoRequest.cep());
                projeto.setCep(endereco.cep());
                projeto.setLogradouro(endereco.logradouro());
                projeto.setComplemento(endereco.complemento());
                projeto.setBairro(endereco.bairro());
                projeto.setLocalidade(endereco.localidade());
                projeto.setUf(endereco.uf());
            }

            return projetoRepository.save(projeto).getId();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean AlterarProjeto(Long id, ProjetoRequest projetoRequest) {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        var projetoBanco = projetoRepository.findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId()).orElse(null);

        if (projetoBanco != null) {
            projetoBanco.setNome(projetoRequest.nome());
            projetoBanco.setPrazo(projetoRequest.prazo());

            if (projetoRequest.cep() != null && !projetoRequest.cep().isEmpty()) {
                var endereco = viaCepService.buscarEnderecoPorCep(projetoRequest.cep());
                projetoBanco.setCep(endereco.cep());
                projetoBanco.setLogradouro(endereco.logradouro());
                projetoBanco.setComplemento(endereco.complemento());
                projetoBanco.setBairro(endereco.bairro());
                projetoBanco.setLocalidade(endereco.localidade());
                projetoBanco.setUf(endereco.uf());
            }

            projetoRepository.save(projetoBanco);
            return true;
        }

        return false;
    }

    public boolean AlterarStatusProjeto(Long id, EnumStatusProjeto status) {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Multilocação: só altera status de projeto do próprio workspace/empresa
        var projetoBanco = projetoRepository.findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId()).orElse(null);

        if (projetoBanco != null) {
            projetoBanco.setStatus(status);
            projetoRepository.saveAndFlush(projetoBanco);
            return true;
        }

        return false;
    }
}
