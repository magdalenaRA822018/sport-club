package com.example.sportclub.repository;

import com.example.sportclub.model.SportClub;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SportClubRepository extends JpaRepository<SportClub,Long> {
}
