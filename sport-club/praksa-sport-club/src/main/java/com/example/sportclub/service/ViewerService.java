package com.example.sportclub.service;

import com.example.sportclub.model.Role;
import com.example.sportclub.model.Viewer;

import java.util.List;

public interface ViewerService {
    void save(Viewer viewer, List<Role> auth);
}
