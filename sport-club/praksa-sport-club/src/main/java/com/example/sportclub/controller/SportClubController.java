package com.example.sportclub.controller;
import com.example.sportclub.dto.SportClubDto;
import com.example.sportclub.mapper.SportClubMapper;
import com.example.sportclub.model.SportClub;
import com.example.sportclub.model.User;
import com.example.sportclub.service.SportClubService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/sportclubs", produces = MediaType.APPLICATION_JSON_VALUE)
public class SportClubController {
    private final SportClubService sportClubService;
    private final SportClubMapper sportClubMapper=new SportClubMapper();
    public SportClubController(SportClubService sportClubService) {
        this.sportClubService = sportClubService;
    }

    @GetMapping("/all")
    //@PreAuthorize("hasRole('EDITOR') || hasRole('VIEWER')")
    public ResponseEntity<List<SportClubDto>> findAll() {
        return new ResponseEntity<>(sportClubMapper.sportClubsToDtos(this.sportClubService.findAll()), HttpStatus.OK);
    }


}
