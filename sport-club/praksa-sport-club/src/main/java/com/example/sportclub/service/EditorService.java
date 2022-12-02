package com.example.sportclub.service;

import com.example.sportclub.model.Editor;
import com.example.sportclub.model.Role;

import java.util.List;

public interface EditorService {
    void save(Editor editor, List<Role> auths);
}
