package com.example.sportclub.service.impl;

import com.example.sportclub.model.Editor;
import com.example.sportclub.model.Role;
import com.example.sportclub.repository.EditorRepository;
import com.example.sportclub.service.EditorService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EditorServiceImpl implements EditorService {
    private final EditorRepository editorRepository;
    private final PasswordEncoder passwordEncoder;
    public EditorServiceImpl(EditorRepository editorRepository, PasswordEncoder passwordEncoder) {
        this.editorRepository = editorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void signup(Editor editor, List<Role> auths) {
        editor.setPassword(passwordEncoder.encode(editor.getPassword()));
        editor.setRoles(auths);
        this.editorRepository.save(editor);
    }
}
