package com.example.sportclub.mapper;

import com.example.sportclub.dto.UserDto;
import com.example.sportclub.model.User;

public class UserMapper {
    public User userDtoToUser(UserDto userDto){
        return new User(userDto.getId(),userDto.getUsername(),userDto.getPassword(),userDto.getFirstname(),
                userDto.getLastname());
    }
}
