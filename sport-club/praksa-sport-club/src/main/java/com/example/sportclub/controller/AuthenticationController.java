package com.example.sportclub.controller;
import com.example.sportclub.dto.JwtAuthenticationRequest;
import com.example.sportclub.dto.UserDto;
import com.example.sportclub.dto.UserTokenState;
import com.example.sportclub.mapper.UserMapper;
import com.example.sportclub.model.User;
import com.example.sportclub.security.TokenUtils;
import com.example.sportclub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import com.example.sportclub.exception.ResourceConflictException;
import javax.servlet.http.HttpServletResponse;
@CrossOrigin
@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

	@Autowired
	private TokenUtils tokenUtils;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserService userService;
	private final UserMapper userMapper=new UserMapper();

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

	@PostMapping("/signup")
	public ResponseEntity<User> addUser(@RequestBody UserDto userDto, UriComponentsBuilder ucBuilder) {

		User existUser = this.userService.findByUsername(userDto.getUsername());

		if (existUser != null) {
			throw new ResourceConflictException(userDto.getId(), "Username already exists");
		}

		User user = this.userService.save(userMapper.userDtoToUser(userDto));
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}
}