package com.example.sportclub.controller;

import com.example.sportclub.dto.SkillDto;
import com.example.sportclub.dto.SportClubDto;
import com.example.sportclub.mapper.SkillMapper;
import com.example.sportclub.service.SkillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/skills", produces = MediaType.APPLICATION_JSON_VALUE)
public class SkillController {
    private final SkillService skillService;
    private final SkillMapper skillMapper = new SkillMapper();
    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }
    @GetMapping("/all")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<List<SkillDto>> findAll() {
        return new ResponseEntity<>(skillMapper.skillsToSkillDtos(this.skillService.findAll()), HttpStatus.OK);
    }
}
