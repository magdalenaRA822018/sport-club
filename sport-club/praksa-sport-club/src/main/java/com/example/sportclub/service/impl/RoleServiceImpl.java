package com.example.sportclub.service.impl;

import java.util.List;

import com.example.sportclub.model.Role;
import com.example.sportclub.repository.RoleRepository;
import com.example.sportclub.service.RoleService;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

  private final RoleRepository roleRepository;

  public RoleServiceImpl(RoleRepository roleRepository) {
    this.roleRepository = roleRepository;
  }

  @Override
  public Role findById(Long id) {
    Role auth = this.roleRepository.getOne(id);
    return auth;
  }

  @Override
  public List<Role> findByName(String name) {
	List<Role> roles = this.roleRepository.findByName(name);
    return roles;
  }




}
