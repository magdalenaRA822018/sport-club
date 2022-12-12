package com.example.sportclub.mapper;

import com.example.sportclub.dto.SportClubDto;
import com.example.sportclub.model.SportClub;

import java.util.ArrayList;
import java.util.List;

public class SportClubMapper {
    private final PlayerMapper playerMapper=new PlayerMapper();
    public SportClubDto sportClubToDto(SportClub sportClub){
        return new SportClubDto(sportClub.getId(),sportClub.getName(),playerMapper.playersToPlayerDtos(sportClub.getPlayers()));
    }
    public List<SportClubDto> sportClubsToDtos(List<SportClub> sportClubs){
        List<SportClubDto> sportClubDtos= new ArrayList<>();
        for(SportClub sportClub: sportClubs)
            sportClubDtos.add(sportClubToDto(sportClub));
        return sportClubDtos;
    }

    public SportClub sportClubDtoToSportClub(SportClubDto sportClubDto) {
        return new SportClub(sportClubDto.getId(),sportClubDto.getName(),null);
    }
}
