package com.example.sportclub.mapper;

import com.example.sportclub.dto.UserDto;
import com.example.sportclub.model.Editor;
import com.example.sportclub.model.User;
import com.example.sportclub.model.Viewer;

public class UserMapper {
    public User userDtoToUser(UserDto userDto){
        return new User(userDto.getId(),userDto.getUsername(),userDto.getPassword(),userDto.getFirstname(),
                userDto.getLastname());
    }
    public Editor userDtoToEditor(UserDto userDto){
        return new Editor(userDto.getId(),userDto.getUsername(),userDto.getPassword(),userDto.getFirstname(),
                userDto.getLastname());
    }
    public Viewer userDtoToViewer(UserDto userDto){
        return new Viewer(userDto.getId(),userDto.getUsername(),userDto.getPassword(),userDto.getFirstname(),
                userDto.getLastname());
    }

}
