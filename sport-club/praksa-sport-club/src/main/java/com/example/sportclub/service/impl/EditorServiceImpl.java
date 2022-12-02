package com.example.sportclub.service.impl;

import com.example.sportclub.model.Editor;
import com.example.sportclub.model.Role;
import com.example.sportclub.repository.EditorRepository;
import com.example.sportclub.service.EditorService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EditorServiceImpl implements EditorService {
    private final EditorRepository editorRepository;

    public EditorServiceImpl(EditorRepository editorRepository) {
        this.editorRepository = editorRepository;
    }

    @Override
    public void save(Editor editor, List<Role> auths) {
        editor.setRoles(auths);
        this.editorRepository.save(editor);
    }
}
