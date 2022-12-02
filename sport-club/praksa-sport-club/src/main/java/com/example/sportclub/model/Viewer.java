package com.example.sportclub.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
@NoArgsConstructor
@Setter
@Getter
@Entity
@DiscriminatorValue("VIEWER")
public class Viewer extends User{
    public Viewer(Long id, String username, String password, String firstName, String lastName) {
        super(id, username, password, firstName, lastName);
    }
}
