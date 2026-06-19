package com.senac.taskagile.taskagileback.presentation;


import com.senac.taskagile.taskagileback.application.DTO.LoginRequest;
import com.senac.taskagile.taskagileback.application.DTO.LoginResponse;
import com.senac.taskagile.taskagileback.application.services.TokenService;
import com.senac.taskagile.taskagileback.application.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(description = "Serviço responsavel por controlar a autentição de usuario e sessão!", name = "Serviço de autenticação")
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    @Operation(description = "Valida senha asdasad 50 caracteres, calcula a longitude", summary = "Login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){


        if(usuarioService.ValidaUsuarioSenha(loginRequest)){

            var token = tokenService.gerarToken(loginRequest.email());
            var usuario = usuarioService.BuscarPorEmail(loginRequest.email());

            return ResponseEntity.ok(new LoginResponse(token, usuario));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


}
