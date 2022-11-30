package com.example.sportclub.service.impl;

import java.util.List;

import com.example.sportclub.model.Role;
import com.example.sportclub.model.User;
import com.example.sportclub.repository.UserRepository;
import com.example.sportclub.service.RoleService;
import com.example.sportclub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleService roleService;

	@Override
	public User findByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByUsername(username);
	}

	public User findById(Long id) throws AccessDeniedException {
		return userRepository.findById(id).orElseGet(null);
	}

	public List<User> findAll() throws AccessDeniedException {
		return userRepository.findAll();
	}
	@Override
	public User save(User userRequest) {
		User user = new User();
		user.setUsername(userRequest.getUsername());
		user.setPassword(passwordEncoder.encode(userRequest.getPassword()));

		user.setFirstName(userRequest.getFirstName());
		user.setLastName(userRequest.getLastName());
		user.setEnabled(true);

		// u primeru se registruju samo obicni korisnici i u skladu sa tim im se i dodeljuje samo rola USER
		List<Role> roles = roleService.findByName("ROLE_USER");
		user.setRoles(roles);

		return this.userRepository.save(user);
	}


}
