package com.example.sportclub.controller;
import com.example.sportclub.dto.ClubPlayersDto;
import com.example.sportclub.dto.PlayerDto;
import com.example.sportclub.dto.ResponseDto;
import com.example.sportclub.mapper.PlayerMapper;
import com.example.sportclub.model.Player;
import com.example.sportclub.service.PlayerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/players", produces = MediaType.APPLICATION_JSON_VALUE)
public class PlayerController {
    private final PlayerService playerService;
    private final PlayerMapper playerMapper=new PlayerMapper();
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('EDITOR') || hasRole('VIEWER')")
    public ResponseEntity<List<PlayerDto>> findAll() {
        return new ResponseEntity<>(playerMapper.playersToPlayerDtos(this.playerService.findAll()), HttpStatus.OK);
    }
    @GetMapping("/withoutClub")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<List<PlayerDto>> findPlayersWithoutClub() {
        return new ResponseEntity<>(playerMapper.playersToPlayerDtos(this.playerService.findPlayersWithoutClub()), HttpStatus.OK);
    }
    @PostMapping("/new")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<ResponseDto> newPlayer(@RequestBody PlayerDto playerDto) {
        try{
            this.playerService.save(playerMapper.playerDtoToPlayer(playerDto));
            return new ResponseEntity<>(new ResponseDto("Success"), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(new ResponseDto("Error"), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/find")
    @PreAuthorize("hasRole('EDITOR') || hasRole('VIEWER')")
    public ResponseEntity<PlayerDto> findById(@RequestBody Map<String,String> data) {
        Player player=this.playerService.findById(Long.parseLong(data.get("id")));
        if(player!=null)
            return new ResponseEntity<>(playerMapper.playerToPlayerDto(player), HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/update")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<ResponseDto> update(@RequestBody PlayerDto playerDto) {
        try{
            boolean addNewImage=false;
            if(playerDto.getImage()!=null) addNewImage=true;
            this.playerService.update(playerMapper.playerDtoToPlayer(playerDto),addNewImage);
            return new ResponseEntity<>(new ResponseDto("Success"), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(new ResponseDto("Error"), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/addToClub")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<ResponseDto> addPlayerToClub(@RequestBody ClubPlayersDto clubPlayersDto) {
        try{
            this.playerService.addPlayerToClub(clubPlayersDto.getPlayerId(),clubPlayersDto.getClubId());
            return new ResponseEntity<>(new ResponseDto("Success"), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(new ResponseDto("Error"), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/removeFromClub")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<ResponseDto> removeFromClub(@RequestBody Map<String,String> data) {
        try{
            this.playerService.removePlayerFromClub(Long.parseLong(data.get("playerId")));
            return new ResponseEntity<>(new ResponseDto("Success"), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(new ResponseDto("Error"), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(value = "/remove")
    @PreAuthorize("hasRole('EDITOR')")
    public ResponseEntity<ResponseDto> deletePost(@RequestBody Map<String,String> data) {
        try{
            this.playerService.delete(Long.parseLong(data.get("id")));
            return new ResponseEntity<>(new ResponseDto("Success"), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(new ResponseDto("Error"),HttpStatus.NOT_FOUND);
        }
    }
}
