package com.example.coldstartdesk;

public final class SessionManager {
    private static String token = "";

    private SessionManager() {
    }

    public static void setToken(String value) {
        token = value == null ? "" : value;
    }

    public static String getToken() {
        return token;
    }
}
