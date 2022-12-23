package com.example.sportclub.service.impl;

import com.example.sportclub.model.Player;
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
        return this.sportClubRepository.findClubById(id);
    }

    @Override
    public SportClub save(SportClub sportClub) throws Exception {
        try{
             return this.sportClubRepository.save(sportClub);
        }catch (Exception e){
            throw new Exception(e);
        }

    }

    @Override
    public void updateName(SportClub newSportClub) {
        SportClub sportClub= this.sportClubRepository.findById(newSportClub.getId()).get();
        sportClub.setName(newSportClub.getName());
        this.sportClubRepository.save(sportClub);
    }
}
