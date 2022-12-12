package com.example.sportclub.controller;
import com.example.sportclub.dto.JwtAuthenticationRequest;
import com.example.sportclub.dto.ResponseDto;
import com.example.sportclub.dto.UserDto;
import com.example.sportclub.dto.UserTokenState;
import com.example.sportclub.mapper.UserMapper;
import com.example.sportclub.model.Role;
import com.example.sportclub.model.User;
import com.example.sportclub.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

	private final AuthenticationService authenticationService;
	private final UserService userService;
	private final ViewerService viewerService;
	private final EditorService editorService;
	private final RoleService roleService;
	private final UserMapper userMapper=new UserMapper();

	public AuthenticationController(AuthenticationService authenticationService, UserService userService, ViewerService viewerService, EditorService editorService, RoleService roleService) {
		this.authenticationService = authenticationService;
		this.userService = userService;
		this.viewerService = viewerService;
		this.editorService = editorService;
		this.roleService = roleService;
	}
	
	@PostMapping("/viewer")
	public ResponseEntity<ResponseDto> registerViewer(@RequestBody UserDto userDto, UriComponentsBuilder ucBuilder) {

		User existUser = this.userService.findByUsername(userDto.getUsername());

		if (existUser != null) {
			return new ResponseEntity<>(new ResponseDto("Username already exists."), HttpStatus.CONFLICT);
		}
		try {
			List<Role> auths = roleService.findByName(userDto.getRole());
			this.viewerService.signup(userMapper.userDtoToViewer(userDto), auths);
			return new ResponseEntity<>(new ResponseDto("Success"), HttpStatus.CREATED);
		}
		catch (Exception e){
			return new ResponseEntity<>(new ResponseDto("Error"), HttpStatus.CREATED);
		}
	}
	@PostMapping("/editor")
	public ResponseEntity<ResponseDto> registerEditor(@RequestBody UserDto userDto, UriComponentsBuilder ucBuilder) {

		User existUser = this.userService.findByUsername(userDto.getUsername());

		if (existUser != null) {
			return new ResponseEntity<>(new ResponseDto("Username already exists."), HttpStatus.CONFLICT);
		}
		try {
			List<Role> auths = roleService.findByName(userDto.getRole());
			this.editorService.signup(userMapper.userDtoToEditor(userDto), auths);
			return new ResponseEntity<>(new ResponseDto("Success"), HttpStatus.CREATED);
		}
		catch (Exception e){
			return new ResponseEntity<>(new ResponseDto("Error"), HttpStatus.CREATED);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<UserTokenState> createAuthenticationToken(
			@RequestBody JwtAuthenticationRequest authenticationRequest, HttpServletResponse response) {

		UserTokenState userTokenState=this.authenticationService.login(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		 if(userTokenState!=null) return new ResponseEntity(userTokenState, HttpStatus.OK);

		 return new ResponseEntity(new UserTokenState(), HttpStatus.BAD_REQUEST);

	}

	@PostMapping(value = "/refresh")
	public ResponseEntity<UserTokenState> refreshAuthenticationToken(HttpServletRequest request) {
		UserTokenState userTokenState=this.authenticationService.refreshAuthenticationToken(request);
		if(userTokenState!=null) return new ResponseEntity(userTokenState, HttpStatus.OK);
		return new ResponseEntity(new UserTokenState(), HttpStatus.BAD_REQUEST);
	}
}