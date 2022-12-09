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
public class SportClubDto {
    private Long id;
    private String name;
    private List<PlayerDto> players;
}
