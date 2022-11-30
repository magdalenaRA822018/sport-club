package com.example.sportclub.repository;

import com.example.sportclub.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player,Long> {
}
