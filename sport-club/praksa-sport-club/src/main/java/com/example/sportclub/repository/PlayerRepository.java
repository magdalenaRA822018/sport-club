package com.example.sportclub.repository;

import com.example.sportclub.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface PlayerRepository extends JpaRepository<Player,Long> {

    @Query("SELECT p FROM Player p WHERE  sport_club_id IS null")
    List<Player> findPlayersWithNoClub();
    @Query("SELECT p FROM Player p WHERE  sport_club_id=:id")
    List<Player> findPlayersByClubId(Long id);
    @Query("SELECT p FROM Player p WHERE  id=:id")
    Player findPlayerById(Long id);
}
