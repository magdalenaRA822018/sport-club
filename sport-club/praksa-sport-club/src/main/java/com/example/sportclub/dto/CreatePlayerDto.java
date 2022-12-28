package com.example.sportclub.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePlayerDto {
    String playerName;
    String image;
    double salary;
    List<SkillDto> skills;
}
