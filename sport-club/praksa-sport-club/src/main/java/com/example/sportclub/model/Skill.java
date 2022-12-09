package com.example.sportclub.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table
public class Skill {
    @Id
    @SequenceGenerator(name = "skill_generator", sequenceName = "skill_sequence", initialValue = 100)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "skill_generator")
    @Column(name = "id", unique = true)
    protected Long id;
    @Column
    private String name;
    @Column
    private String description;
}
