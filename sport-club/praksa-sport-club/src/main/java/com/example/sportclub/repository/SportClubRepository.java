package com.example.sportclub.repository;

import com.example.sportclub.model.SportClub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SportClubRepository extends JpaRepository<SportClub,Long> {
    @Query("SELECT s FROM SportClub s WHERE  s.id=:id")
    SportClub findClubById(Long id);
}
