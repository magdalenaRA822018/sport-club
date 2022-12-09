package com.example.sportclub.service.impl;

import com.example.sportclub.dto.UserTokenState;
import com.example.sportclub.model.User;
import com.example.sportclub.security.TokenUtils;
import com.example.sportclub.service.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final TokenUtils tokenUtils;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final EditorService editorService;
    private final ViewerService viewerService;
    private final RoleService roleService;
    private final CustomUserDetailsService customUserDetailsService;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationServiceImpl(TokenUtils tokenUtils, AuthenticationManager authenticationManager, UserService userService, EditorService editorService, ViewerService viewerService, RoleService roleService, CustomUserDetailsService customUserDetailsService, PasswordEncoder passwordEncoder) {
        this.tokenUtils = tokenUtils;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.editorService = editorService;
        this.viewerService = viewerService;
        this.roleService = roleService;
        this.customUserDetailsService = customUserDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserTokenState login(String username, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    username, password));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) authentication.getPrincipal();
            String role = user.getRoles().get(0).getName();
            String jwt = tokenUtils.generateToken(user.getUsername());
            int expiresIn = tokenUtils.getExpiredIn();

            return new UserTokenState(jwt, expiresIn, user.getUsername(), role);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public UserTokenState refreshAuthenticationToken(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        String username = this.tokenUtils.getUsernameFromToken(token);
        User user = (User) this.customUserDetailsService.loadUserByUsername(username);
        try{
            this.tokenUtils.canTokenBeRefreshed(token, user.getLastPasswordResetDate());
            String refreshedToken = tokenUtils.refreshToken(token);
            int expiresIn = tokenUtils.getExpiredIn();
            String role= user.getRoles().get(0).getName();
            return new UserTokenState(refreshedToken, expiresIn, username,role);
        } catch (Exception e){
            return null;
        }

    }
}
