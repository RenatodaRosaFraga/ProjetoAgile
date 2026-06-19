package com.senac.taskagile.taskagileback.application.services;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.senac.taskagile.taskagileback.domain.entities.Token;
import com.senac.taskagile.taskagileback.domain.entities.Usuario;
import com.senac.taskagile.taskagileback.domain.repository.TokenRepository;
import com.senac.taskagile.taskagileback.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${spring.secretkey}")
    private String secret;


    @Value("${spring.emissor}")
    private String emissor;

    @Value("${spring.tempoExpiracao}")
    private Long tempoExpiracao;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    public Usuario validarToken(String token) {
        try {

            Algorithm algoritomo = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algoritomo)
                    .withIssuer(emissor)
                    .build();
            verifier.verify(token);

            var tokenBanco = tokenRepository.findTokenByToken(token);

            return tokenBanco.get().getUsuario();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public String gerarToken(String email) {

        try{
            Algorithm algoritomo = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer(emissor)
                    .withSubject(email)
                    .withExpiresAt(gerarDataExpiracao())
                    .sign(algoritomo);

            var usuario = usuarioRepository.findAll()
                    .stream()
                    .filter(u -> u.getEmail().equals(email)).findFirst().orElse(null);

            tokenRepository.save(new Token(token,usuario));

            return token;


        }catch (Exception e){

            return  null;
        }

    }

    private Instant gerarDataExpiracao(){

        return LocalDateTime.now().plusMinutes(tempoExpiracao).toInstant(ZoneOffset.of("-03:00"));
    }

}