package com.example.sportclub.mapper;

import com.example.sportclub.dto.SkillDto;
import com.example.sportclub.model.Skill;

import java.util.ArrayList;
import java.util.List;

public class SkillMapper {
    public SkillDto skillToSkillDto(Skill skill){
        return  new SkillDto(skill.getId(),skill.getName(),skill.getDescription());
    }
    public List<SkillDto> skillsToSkillDtos (List<Skill> skills){
        List<SkillDto> skillDtos= new ArrayList<>();
        for(Skill skill: skills)
            skillDtos.add(skillToSkillDto(skill));
        return  skillDtos;
    }
}
