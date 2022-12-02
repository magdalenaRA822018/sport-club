package com.example.sportclub.service;

import com.example.sportclub.model.Role;

import java.util.List;

public interface RoleService {
	Role findById(Long id);
	List<Role> findByName(String name);

}
