package com.example.sportclub.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
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
    @SequenceGenerator(name = "player_generator", sequenceName = "player_sequence", initialValue = 100)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "player_generator")
    @Column(name = "id", unique = true)
    protected Long id;
    @Column
    String playerName;
    @Column
    String image;
    @Column
    double salary;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    List<Skill> skills;

    @ManyToOne
    @JoinColumn(name="sport_club_id")
    private SportClub sportClub;

    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", playerName='" + playerName + '\'' +
                ", image='" + image + '\'' +
                ", salary=" + salary +
                ", skills=" + skills +
                '}';
    }
}
