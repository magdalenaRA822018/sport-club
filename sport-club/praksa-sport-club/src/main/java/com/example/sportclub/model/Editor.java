package com.example.sportclub.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
@AllArgsConstructor
@Setter
@Getter
@Entity
@DiscriminatorValue("EDITOR")
public class Editor extends User{

}
