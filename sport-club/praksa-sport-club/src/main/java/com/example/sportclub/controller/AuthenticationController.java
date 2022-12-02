package com.example.sportclub.controller;
import com.example.sportclub.dto.JwtAuthenticationRequest;
import com.example.sportclub.dto.UserDto;
import com.example.sportclub.dto.UserTokenState;
import com.example.sportclub.mapper.UserMapper;
import com.example.sportclub.model.Role;
import com.example.sportclub.model.User;
import com.example.sportclub.security.TokenUtils;
import com.example.sportclub.service.EditorService;
import com.example.sportclub.service.RoleService;
import com.example.sportclub.service.UserService;
import com.example.sportclub.service.ViewerService;
import com.example.sportclub.service.impl.CustomUserDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

	private final TokenUtils tokenUtils;
	private final AuthenticationManager authenticationManager;
	private final UserService userService;
	private final EditorService editorService;
	private final ViewerService viewerService;
	private final RoleService roleService;
	private final CustomUserDetailsService customUserDetailsService;

	private final UserMapper userMapper=new UserMapper();

	public AuthenticationController(TokenUtils tokenUtils, AuthenticationManager authenticationManager, UserService userService, EditorService editorService, ViewerService viewerService, RoleService roleService, CustomUserDetailsService customUserDetailsService) {
		this.tokenUtils = tokenUtils;
		this.authenticationManager = authenticationManager;
		this.userService = userService;
		this.editorService = editorService;
		this.viewerService = viewerService;
		this.roleService = roleService;
		this.customUserDetailsService = customUserDetailsService;
	}


	@PostMapping(value = "/refresh")
	public ResponseEntity<UserTokenState> refreshAuthenticationToken(HttpServletRequest request) {
		String token = tokenUtils.getToken(request);
		String username = this.tokenUtils.getUsernameFromToken(token);
		User user = (User) this.customUserDetailsService.loadUserByUsername(username);
		String userType = user.getClass().getSimpleName();
		try{
			this.tokenUtils.canTokenBeRefreshed(token, user.getLastPasswordResetDate());
			String refreshedToken = tokenUtils.refreshToken(token);
			int expiresIn = tokenUtils.getExpiredIn();
			String role= user.getRoles().get(0).getName();
			return ResponseEntity.ok(new UserTokenState(refreshedToken, expiresIn, username,role));
		} catch (Exception e){
			UserTokenState userTokenState = new UserTokenState();
			return ResponseEntity.badRequest().body(userTokenState);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<UserTokenState> createAuthenticationToken(
			@RequestBody JwtAuthenticationRequest authenticationRequest, HttpServletResponse response) {

		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				authenticationRequest.getUsername(), authenticationRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		User user = (User) authentication.getPrincipal();
		String role= user.getRoles().get(0).getName();
		String jwt = tokenUtils.generateToken(user.getUsername());
		int expiresIn = tokenUtils.getExpiredIn();
		return ResponseEntity.ok(new UserTokenState(jwt, expiresIn, user.getUsername(), role));
	}

	@PostMapping("/editor")
	public ResponseEntity<String> registerEditor(@RequestBody UserDto userDto, UriComponentsBuilder ucBuilder) {

		User existUser = this.userService.findByUsername(userDto.getUsername());

		if (existUser != null) {
			return new ResponseEntity<>("Username already exists.", HttpStatus.CONFLICT);
		}
		List<Role> auths=roleService.findByName(userDto.getRole());
		editorService.save(userMapper.userDtoToEditor(userDto),auths);
		return new ResponseEntity<>("Success.", HttpStatus.CREATED);
	}
	@PostMapping("/viewer")
	public ResponseEntity<String> registerViewer(@RequestBody UserDto userDto, UriComponentsBuilder ucBuilder) {

		User existUser = this.userService.findByUsername(userDto.getUsername());

		if (existUser != null) {
			return new ResponseEntity<>("Username already exists.", HttpStatus.CONFLICT);
		}
		List<Role> auths=roleService.findByName(userDto.getRole());
		viewerService.save(userMapper.userDtoToViewer(userDto),auths);
		return new ResponseEntity<>("Success.", HttpStatus.CREATED);
	}
}