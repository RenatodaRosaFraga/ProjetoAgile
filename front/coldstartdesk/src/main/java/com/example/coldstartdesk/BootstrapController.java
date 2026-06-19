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
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class BootstrapController {

    @FXML
    private TextField txtWorkspace;

    @FXML
    private TextField txtNome;

    @FXML
    private TextField txtEmail;

    @FXML
    private TextField txtCpf;

    @FXML
    private PasswordField txtSenha;

    @FXML
    private void onVoltarButtonClick(ActionEvent event) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("login-view.fxml"));
        Scene scene = new Scene(loader.load());
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setScene(scene);
    }

    @FXML
    private void onSalvarButtonClick(ActionEvent event) throws IOException {
        URL url = new URL("http://localhost:8080/bootstrap");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-type", "application/json; charset=UTF-8");
        conn.setDoOutput(true);

        String json = "{\n" +
                "  \"workspaceNome\": \"" + txtWorkspace.getText() + "\",\n" +
                "  \"nome\": \"" + txtNome.getText() + "\",\n" +
                "  \"email\": \"" + txtEmail.getText() + "\",\n" +
                "  \"senha\": \"" + txtSenha.getText() + "\",\n" +
                "  \"cpf\": \"" + txtCpf.getText().replaceAll("\\D", "") + "\"\n" +
                "}";

        try (OutputStream os = conn.getOutputStream()) {
            os.write(json.getBytes(StandardCharsets.UTF_8));
        }

        int code = conn.getResponseCode();
        if (code >= 200 && code < 300) {
            LoginController.showMenssage("Workspace criado com sucesso!", Alert.AlertType.INFORMATION);
            onVoltarButtonClick(event);
        } else {
            LoginController.showMenssage("Erro ao criar workspace! HTTP " + code, Alert.AlertType.ERROR);
        }

        conn.disconnect();
    }
}
