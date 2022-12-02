package com.example.sportclub.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
@NoArgsConstructor
@Setter
@Getter
@Entity
@DiscriminatorValue("EDITOR")
public class Editor extends User{


    public Editor(Long id, String username, String password, String firstName, String lastName) {
        super(id, username, password, firstName, lastName);
    }
}
