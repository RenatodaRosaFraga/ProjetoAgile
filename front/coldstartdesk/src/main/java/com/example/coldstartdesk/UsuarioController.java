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
import javafx.scene.control.TextFormatter;
import java.util.function.UnaryOperator;

import static com.example.coldstartdesk.LoginController.showMenssage;

public class UsuarioController {

    @FXML
    private TextField txtNome;

    @FXML
    private TextField txtEmail;

    @FXML
    private TextField txtCpf;

    @FXML
    private TextField txtCargo;

    @FXML
    private PasswordField txtSenha;

    @FXML
    private void onVoltarButtonClick(ActionEvent event) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("menu-view.fxml"));
        Scene scene = new Scene(loader.load());
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setScene(scene);
    }

    @FXML
    public void initialize() {
        UnaryOperator<TextFormatter.Change> filter = change -> {
            String newText = change.getControlNewText();
            String digits = newText.replaceAll("\\D", "");
            if (digits.length() > 11) return null;
            return change;
        };

        TextFormatter<String> textFormatter = new TextFormatter<>(filter);
        txtCpf.setTextFormatter(textFormatter);

        txtCpf.textProperty().addListener((obs, oldV, newV) -> {
            String digits = newV.replaceAll("\\D", "");
            String formatted = formatCpf(digits);
            if (!newV.equals(formatted)) {
                txtCpf.setText(formatted);
            }
        });
    }

    private String formatCpf(String digits) {
        StringBuilder sb = new StringBuilder();
        int len = digits.length();
        for (int i = 0; i < len; i++) {
            sb.append(digits.charAt(i));
            if (i == 2 || i == 5) sb.append('.');
            if (i == 8) sb.append('-');
        }
        return sb.toString();
    }

    @FXML
    private void onSalvarButtonClick(ActionEvent event) throws IOException {
        String nome = txtNome.getText() != null ? txtNome.getText().trim() : "";
        String email = txtEmail.getText() != null ? txtEmail.getText().trim() : "";
        String cpfRaw = txtCpf.getText() != null ? txtCpf.getText().replaceAll("\\D", "").trim() : "";
        String cargo = txtCargo.getText() != null ? txtCargo.getText().trim() : "";
        String senha = txtSenha.getText() != null ? txtSenha.getText().trim() : "";

        if (nome.isEmpty() || email.isEmpty() || cpfRaw.isEmpty() || cargo.isEmpty() || senha.isEmpty()) {
            showMenssage("Preencha todos os campos", Alert.AlertType.ERROR);
            return;
        }

        URL url = new URL("http://localhost:8080/usuarios/adm");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-type", "application/json; charset=UTF-8");
        conn.setRequestProperty("Authorization", "Bearer " + SessionManager.getToken());
        conn.setDoOutput(true);

        String json = "{\n" +
                "  \"nome\": \"" + nome + "\",\n" +
                "  \"email\": \"" + email + "\",\n" +
                "  \"cpf\": \"" + cpfRaw + "\",\n" +
                "  \"cargo\": \"" + cargo + "\",\n" +
                "  \"secretKey\": \"adujfbdbfajdbfkjdbfkjdafkjs\",\n" +
                "  \"senha\": \"" + senha + "\"\n" +
                "}";

        try (OutputStream os = conn.getOutputStream()) {
            os.write(json.getBytes(StandardCharsets.UTF_8));
        }

        int code = conn.getResponseCode();
        if (code >= 200 && code < 300) {
            showMenssage("Usuário administrador criado com sucesso!", Alert.AlertType.INFORMATION);
            FXMLLoader loader = new FXMLLoader(getClass().getResource("menu-view.fxml"));
            Scene scene = new Scene(loader.load());
            Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
            stage.setScene(scene);
        } else {
            showMenssage("Erro ao salvar! HTTP " + code, Alert.AlertType.ERROR);
        }

        conn.disconnect();
    }
}
