package com.example.sportclub.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.List;
import java.util.Set;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table
public class Player {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column
    String playerName;
    @Column
    String image;
    @Column
    double salary;
    @ManyToMany
    List<Skill> skills;
    @ManyToOne
    @JoinColumn(name="sport_club_id", nullable=false)
    private SportClub sportClub;

}
