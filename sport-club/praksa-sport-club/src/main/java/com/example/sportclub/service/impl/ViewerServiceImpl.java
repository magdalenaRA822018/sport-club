package com.example.sportclub.service.impl;

import com.example.sportclub.model.Role;
import com.example.sportclub.model.Viewer;
import com.example.sportclub.repository.ViewerRepository;
import com.example.sportclub.service.ViewerService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ViewerServiceImpl implements ViewerService {
    private final ViewerRepository viewerRepository;
    private final PasswordEncoder passwordEncoder;
    public ViewerServiceImpl(ViewerRepository viewerRepository, PasswordEncoder passwordEncoder) {
        this.viewerRepository = viewerRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void signup(Viewer viewer, List<Role> auth)  {
        try{
            viewer.setPassword(passwordEncoder.encode(viewer.getPassword()));
            viewer.setRoles(auth);
            this.viewerRepository.save(viewer);
        }catch (Exception e){

        }

    }
}
