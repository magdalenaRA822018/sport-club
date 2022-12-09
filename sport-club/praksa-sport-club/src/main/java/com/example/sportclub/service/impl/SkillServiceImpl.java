package com.example.sportclub.service.impl;

import com.example.sportclub.model.Skill;
import com.example.sportclub.repository.SkillRepository;
import com.example.sportclub.service.SkillService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillServiceImpl implements SkillService {
    private final SkillRepository skillRepository;

    public SkillServiceImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public List<Skill> findAll() {
        return this.skillRepository.findAll();
    }
}
