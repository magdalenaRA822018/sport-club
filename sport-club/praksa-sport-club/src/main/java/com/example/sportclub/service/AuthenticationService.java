package com.example.sportclub.service;

import com.example.sportclub.dto.UserDto;
import com.example.sportclub.dto.UserTokenState;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;

public interface AuthenticationService {
    UserTokenState login(String username,String password);
    UserTokenState refreshAuthenticationToken(HttpServletRequest request);
}
