package com.example.sportclub.service;
import com.example.sportclub.dto.PlayerDto;
import com.example.sportclub.model.Player;
import com.example.sportclub.model.SportClub;
import java.util.List;

public interface PlayerService {
    void save(Player player) throws Exception;;
    void removePlayerFromClub(Long id)throws Exception;
    List<Player> findPlayersWithoutClub();
    List<Player> findAll();
    Player findById(Long id);
    void update(Player player, boolean addNewImage) throws Exception;
    void addPlayersToClub(List<PlayerDto> playerIds, Long sportClub) throws Exception;

    void delete(Long id) throws Exception;
}
