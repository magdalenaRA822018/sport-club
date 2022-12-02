package com.example.sportclub.service.impl;

import com.example.sportclub.model.Role;
import com.example.sportclub.model.Viewer;
import com.example.sportclub.repository.ViewerRepository;
import com.example.sportclub.service.ViewerService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ViewerServiceImpl implements ViewerService {
    private final ViewerRepository viewerRepository;

    public ViewerServiceImpl(ViewerRepository viewerRepository) {
        this.viewerRepository = viewerRepository;
    }


    @Override
    public void save(Viewer viewer, List<Role> auth)  {
        try{
            viewer.setRoles(auth);
            this.viewerRepository.save(viewer);
        }catch (Exception e){

        }

    }
}
