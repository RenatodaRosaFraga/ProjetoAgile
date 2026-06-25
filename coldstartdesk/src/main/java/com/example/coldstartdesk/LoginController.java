package com.example.coldstartdesk;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class LoginController {

    @FXML
    private TextField txtLogin;

    @FXML
    private PasswordField txtSenha;

    @FXML
    private void onLoginButtonClick(ActionEvent event) throws IOException {
        String login = txtLogin.getText();
        String senha = txtSenha.getText();
        
        // Verificar credenciais admin
        if ("admin".equals(login) && "12345".equals(senha)) {
            showMenssage("Login efetuado com sucesso!", Alert.AlertType.INFORMATION);
            
            FXMLLoader loader = new FXMLLoader(getClass().getResource("bootstrap-view.fxml"));
            Scene scene = new Scene(loader.load());
            Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
            stage.setScene(scene);
        } else {
            showMenssage("Usuário e senha inválidos!", Alert.AlertType.ERROR);
        }
    }

    private String extrairToken(String json) {
        String marcador = "\"token\":\"";
        int inicio = json.indexOf(marcador);
        if (inicio < 0) {
            return "";
        }
        inicio += marcador.length();
        int fim = json.indexOf('"', inicio);
        return fim > inicio ? json.substring(inicio, fim) : "";
    }

    public static void showMenssage(String mensagem, Alert.AlertType tipo) {
        Alert alert = new Alert(tipo);
        alert.setTitle("Login");
        alert.setHeaderText(null);
        alert.setContentText(mensagem);
        alert.showAndWait();
    }
}
