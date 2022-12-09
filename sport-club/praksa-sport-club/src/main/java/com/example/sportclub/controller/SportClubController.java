package com.example.sportclub.controller;
import com.example.sportclub.dto.PlayerDto;
import com.example.sportclub.dto.ResponseDto;
import com.example.sportclub.dto.SportClubDto;
import com.example.sportclub.mapper.PlayerMapper;
import com.example.sportclub.mapper.SportClubMapper;
import com.example.sportclub.model.SportClub;
import com.example.sportclub.service.PlayerService;
import com.example.sportclub.service.SportClubService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/sportclubs", produces = MediaType.APPLICATION_JSON_VALUE)
public class SportClubController {

    private final SportClubService sportClubService;
    private final PlayerService playerService;
    private final SportClubMapper sportClubMapper=new SportClubMapper();
    private final PlayerMapper playerMapper=new PlayerMapper();

    public SportClubController(SportClubService sportClubService, PlayerService playerService) {
        this.sportClubService = sportClubService;
        this.playerService = playerService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('EDITOR') || hasRole('VIEWER')")
    public ResponseEntity<List<SportClubDto>> findAll() {
        return new ResponseEntity<>(sportClubMapper.sportClubsToDtos(this.sportClubService.findAll()), HttpStatus.OK);
    }
    @PostMapping("/club")
    @PreAuthorize("hasRole('EDITOR') || hasRole('VIEWER')")
    public ResponseEntity<SportClubDto> findById(@RequestBody Map<String,String> data) {
        return new ResponseEntity<>(sportClubMapper.sportClubToDto(this.sportClubService.findById(Long.parseLong(data.get("id")))), HttpStatus.OK);
    }
    @PostMapping("/update")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<ResponseDto> update(@RequestBody SportClubDto sportClubDto) {
        try{
            this.sportClubService.updateName(sportClubMapper.sportClubDtoToSportClub(sportClubDto));
            return new ResponseEntity<>(new ResponseDto("Success"), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(new ResponseDto("Error"), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/new")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<ResponseDto> newClub(@RequestBody SportClubDto sportClubDto) {
        try{
            SportClub sportClub=sportClubMapper.sportClubDtoToSportClub(sportClubDto);
            this.sportClubService.save(sportClub);
            this.playerService.addPlayersToClub(sportClubDto.getPlayers(),sportClub.getId());
            return new ResponseEntity<>(new ResponseDto("Success"), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(new ResponseDto("Error"), HttpStatus.BAD_REQUEST);
        }
    }




}
