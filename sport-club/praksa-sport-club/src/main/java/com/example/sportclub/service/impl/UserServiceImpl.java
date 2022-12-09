package com.example.sportclub.service.impl;

import java.util.List;

import com.example.sportclub.model.Role;
import com.example.sportclub.model.User;
import com.example.sportclub.repository.UserRepository;
import com.example.sportclub.service.RoleService;
import com.example.sportclub.service.UserService;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	private final PasswordEncoder passwordEncoder;

	private final RoleService roleService;

	public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleService roleService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.roleService = roleService;
	}

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
	public void update(User newUser) throws Exception {
		try {
			User user = this.userRepository.findByUsername(newUser.getUsername());
			user.setFirstName(newUser.getFirstName());
			user.setLastName(newUser.getLastName());
			this.userRepository.save(user);
		}catch (Exception e){
			throw new Exception(e);
		}
	}

	@Override
	public void changePassword(User user, String newPassword) throws Exception {
		try {
			user.setPassword(passwordEncoder.encode(newPassword));
			this.userRepository.save(user);
		}catch (Exception e){
			throw new Exception(e);
		}
	}


}
