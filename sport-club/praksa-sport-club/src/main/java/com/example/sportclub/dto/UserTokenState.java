package com.example.sportclub.dto;


public class UserTokenState {
	
    private String accessToken;
    private Long expiresIn;
    private String username;
    private String roles;



    public UserTokenState() {
        this.accessToken = null;
        this.expiresIn = null;
        this.username = "";
        this.roles = null;
    }

    public UserTokenState(String accessToken, long expiresIn, String username, String  roles) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.username = username;
        this.roles = roles;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}