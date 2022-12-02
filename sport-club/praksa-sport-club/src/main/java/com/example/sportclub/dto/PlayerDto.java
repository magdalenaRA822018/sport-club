package com.example.sportclub.dto;

import com.example.sportclub.model.Skill;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDto {
    Long id;
    String playerName;
    String image;
    double salary;
    List<SkillDto> skills;
}
