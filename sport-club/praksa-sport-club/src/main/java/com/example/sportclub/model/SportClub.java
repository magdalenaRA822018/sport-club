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
public class SportClub {
    @Id
    @SequenceGenerator(name = "club_generator", sequenceName = "club_sequence", initialValue = 100)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "club_generator")
    @Column(name = "id", unique = true)
    protected Long id;

    @Column
    private String name;

    @OneToMany(mappedBy= "sportClub",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Player> players;

    @Override
    public String toString() {
        return "SportClub{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", players=" + players +
                '}';
    }
}
