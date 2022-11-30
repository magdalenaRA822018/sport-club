package com.example.sportclub.repository;

import com.example.sportclub.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role,Long> {

    List<Role> findByName(String name);
}
