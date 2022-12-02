package com.example.sportclub.mapper;

import com.example.sportclub.dto.PlayerDto;
import com.example.sportclub.model.Player;

import java.util.ArrayList;
import java.util.List;

public class PlayerMapper {
    private final SkillMapper skillMapper= new SkillMapper();

    PlayerDto playerToPlayerDto(Player player){
        return new PlayerDto(player.getId(),player.getPlayerName(),player.getImage(),player.getSalary(),
                skillMapper.skillsToSkillDtos(player.getSkills()));
    }
    List<PlayerDto> playersToPlayerDtos(List<Player> players){
        List<PlayerDto> playerDtos=new ArrayList<>();
        for(Player player: players)
            playerDtos.add(playerToPlayerDto(player));
        return playerDtos;
    }
}
