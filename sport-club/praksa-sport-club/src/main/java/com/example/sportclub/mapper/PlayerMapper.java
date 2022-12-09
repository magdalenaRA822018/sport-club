package com.example.sportclub.mapper;

import com.example.sportclub.dto.PlayerDto;
import com.example.sportclub.model.Player;

import java.util.ArrayList;
import java.util.List;

public class PlayerMapper {
    private final SkillMapper skillMapper= new SkillMapper();
    private final ImageMapper imageMapper=new ImageMapper();


    public PlayerDto playerToPlayerDto(Player player){
        String clubName="NO CLUB";
        Long clubId=0L;
        if(player.getSportClub()!=null) {
            clubName = player.getSportClub().getName();
            clubId= player.getId();
        }
        return new PlayerDto(player.getId(),player.getPlayerName(),imageMapper.decodeBase64(player.getImage()),player.getSalary(),
                skillMapper.skillsToSkillDtos(player.getSkills()),clubName,clubId.toString());
    }
    public List<PlayerDto> playersToPlayerDtos(List<Player> players){
        List<PlayerDto> playerDtos=new ArrayList<>();
        for(Player player: players)
            playerDtos.add(playerToPlayerDto(player));
        return playerDtos;
    }

    public Player playerDtoToPlayer(PlayerDto playerDto) {
        String image="";
        if(playerDto.getImage()!=null) image=playerDto.getImage();
        return new Player(playerDto.getId(),playerDto.getPlayerName(),image,
                playerDto.getSalary(),skillMapper.skillDtosToSkills(playerDto.getSkills()), null);
    }



    public List<Player> playerDtosToPlayers(List<PlayerDto> playerDtos) {
        List<Player> players=new ArrayList<>();
        for(PlayerDto playerDto: playerDtos)
            players.add(playerDtoToPlayer(playerDto));
        return players;
    }
}
