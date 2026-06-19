module com.example.coldstartdesk {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.coldstartdesk to javafx.fxml;
    exports com.example.coldstartdesk;
}