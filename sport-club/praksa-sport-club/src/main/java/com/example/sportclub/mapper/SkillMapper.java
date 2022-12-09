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
    public List<Skill> skillDtosToSkills (List<SkillDto> skillDtos){
        List<Skill> skills= new ArrayList<>();
        for(SkillDto skillDto: skillDtos) {
            skills.add(skillDtoToSkill(skillDto));
            System.out.println("molim te "+skillDto);
        }
        return  skills;
    }

    public Skill skillDtoToSkill(SkillDto skillDto) {
        return new Skill(skillDto.getId(),skillDto.getName(),skillDto.getDescription());
    }
}
