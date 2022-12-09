package com.example.sportclub.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
	private Long id;
    private String role;
	private String username;
	private String password;
	private String firstname;
	private String lastname;
}
