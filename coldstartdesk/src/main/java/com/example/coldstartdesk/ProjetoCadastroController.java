package com.example.coldstartdesk;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import static com.example.coldstartdesk.LoginController.showMenssage;

public class ProjetoCadastroController {

    @FXML
    private TextField txtNome;

    @FXML
    private TextField txtPrazo;

    @FXML
    private void onVoltarButtonClick(ActionEvent event) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("menu-view.fxml"));
        Scene scene = new Scene(loader.load());
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setScene(scene);
    }

    @FXML
    private void onSalvarButtonClick(ActionEvent event) throws IOException {
        URL url = new URL("http://localhost:8080/projetos");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestProperty("Authorization", "Bearer " + SessionManager.getToken());
        conn.setDoOutput(true);

        String json = "{\n" +
                "  \"nome\": \"" + txtNome.getText() + "\",\n" +
                "  \"prazo\": \"" + txtPrazo.getText() + "\"\n" +
                "}";

        try (OutputStream os = conn.getOutputStream()) {
            os.write(json.getBytes(StandardCharsets.UTF_8));
        }

        var code = conn.getResponseCode();
        if (code == 200) {
            showMenssage("Sucesso ao salvar! ", Alert.AlertType.INFORMATION);
            FXMLLoader loader = new FXMLLoader(getClass().getResource("menu-view.fxml"));
            Scene scene = new Scene(loader.load());
            Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
            stage.setScene(scene);
        } else {
            showMenssage("Erro ao salvar! ", Alert.AlertType.ERROR);
        }

        conn.disconnect();
    }
}
