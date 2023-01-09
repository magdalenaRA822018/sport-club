package com.example.sportclub.controller;

import com.example.sportclub.dto.ChangePasswordDto;
import com.example.sportclub.dto.ResponseDto;
import com.example.sportclub.dto.UserDto;
import com.example.sportclub.mapper.UserMapper;
import com.example.sportclub.model.User;
import com.example.sportclub.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper=new UserMapper();
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }
    @PostMapping("/update")
    @PreAuthorize("hasRole('EDITOR') || hasRole('VIEWER')")
    public ResponseEntity<String> update(@RequestBody UserDto userDto) {
        if(this.userService.findByUsername(userDto.getUsername())==null)
            return new ResponseEntity<>("User doesn't exist.", HttpStatus.BAD_REQUEST);
        try{
            this.userService.update(userMapper.userDtoToUser(userDto));
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
        }

    }
    @GetMapping("/user")
    @PreAuthorize("hasRole('EDITOR') || hasRole('VIEWER')")
    public ResponseEntity<UserDto> findById(@RequestBody Map<String,String> data) {
        User user = this.userService.findById(Long.parseLong(data.get("id")));
        if(user!=null)
         return new ResponseEntity<>(userMapper.userToUserDto(user), HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/username")
    @PreAuthorize("hasRole('EDITOR') || hasRole('VIEWER')")
    public ResponseEntity<UserDto> findByUsername(@RequestBody Map<String,String> data) {
        String username= data.get("username");
        User user=this.userService.findByUsername(username);
        if(user!=null) return new ResponseEntity<>(userMapper.userToUserDto(user), HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/password")
    @PreAuthorize("hasRole('EDITOR') || hasRole('VIEWER')")
    public ResponseEntity<ResponseDto> changePassword(@RequestBody ChangePasswordDto changePasswordDto) {
        User user=this.userService.findByUsername(changePasswordDto.getUsername());
        if(user==null) return new ResponseEntity<>(new ResponseDto("User doesn't exist"), HttpStatus.BAD_REQUEST);
        try{
            this.userService.changePassword(user,changePasswordDto.getPassword());
            return new ResponseEntity<>(new ResponseDto("Success"), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(new ResponseDto("Error"), HttpStatus.OK);
        }
    }
}
