package com.example.sportclub.service;

import com.example.sportclub.model.Editor;
import com.example.sportclub.model.Role;
import com.example.sportclub.model.Viewer;

import java.util.List;

public interface EditorService {
    void signup(Editor editor, List<Role> auths);
}
