package com.example.sportclub.service;

import com.example.sportclub.model.SportClub;

import java.util.List;

public interface SportClubService {
    List<SportClub> findAll();
    SportClub findById(Long id);
    void create (SportClub sportClub);
}
