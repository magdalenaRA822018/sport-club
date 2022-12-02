package com.example.sportclub.service.impl;

import com.example.sportclub.model.SportClub;
import com.example.sportclub.repository.SportClubRepository;
import com.example.sportclub.service.SportClubService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SportClubServiceImpl implements SportClubService {
    private final SportClubRepository sportClubRepository;

    public SportClubServiceImpl(SportClubRepository sportClubRepository) {
        this.sportClubRepository = sportClubRepository;
    }

    @Override
    public List<SportClub> findAll() {
        return this.sportClubRepository.findAll();
    }

    @Override
    public SportClub findById(Long id) {
        return this.sportClubRepository.findById(id).get();
    }

    @Override
    public void create(SportClub sportClub) {

    }
}
