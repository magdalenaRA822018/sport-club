package com.example.sportclub.service;

import com.example.sportclub.model.Player;
import com.example.sportclub.model.SportClub;

import java.util.List;

public interface SportClubService {
    List<SportClub> findAll();
    SportClub findById(Long id);
    SportClub save(SportClub sportClub) throws Exception;

    void updateName(SportClub sportClub);
}
