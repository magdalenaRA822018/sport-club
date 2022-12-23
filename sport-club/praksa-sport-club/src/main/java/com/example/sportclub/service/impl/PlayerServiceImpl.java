package com.example.sportclub.service.impl;

import com.example.sportclub.dto.PlayerDto;
import com.example.sportclub.model.Player;
import com.example.sportclub.model.SportClub;
import com.example.sportclub.repository.PlayerRepository;
import com.example.sportclub.service.PlayerService;
import com.example.sportclub.service.SportClubService;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
public class PlayerServiceImpl implements PlayerService {
    private final PlayerRepository playerRepository;
    private final SportClubService sportClubService;

    public PlayerServiceImpl(PlayerRepository playerRepository, SportClubService sportClubService) {
        this.playerRepository = playerRepository;
        this.sportClubService = sportClubService;
    }

    @Override
    public void save(Player player) throws Exception {
        try {
            String imagePath = saveImage(player.getImage());
            player.setImage(imagePath);
            this.playerRepository.save(player);
        }catch (Exception e){
            throw new Exception(e);
        }
    }

    @Override
    public void removePlayerFromClub(Long id) throws Exception {
        try{
            Player player=this.playerRepository.findById(id).get();
            player.setSportClub(null);
            this.playerRepository.save(player);
        }catch (Exception e){
            throw new Exception(e);
        }
    }

    @Override
    public List<Player> findPlayersWithoutClub() {
        return this.playerRepository.findPlayersWithNoClub();
    }

    @Override
    public List<Player> findAll() {
        return this.playerRepository.findAll();
    }

    @Override
    public Player findById(Long id) {
        return this.playerRepository.findById(id).get();
    }

    @Override
    public void update(Player newPlayer, boolean addNewImage) throws Exception {
        try {
            Player player = this.playerRepository.findById(newPlayer.getId()).get();
            player.setPlayerName(newPlayer.getPlayerName());
            player.setSalary(newPlayer.getSalary());
            player.setSkills(null);
            this.playerRepository.save(player);
            player.setSkills(newPlayer.getSkills());
            if (addNewImage) {
                String imagePath = saveImage(newPlayer.getImage());
                player.setImage(imagePath);
            }
            this.playerRepository.save(player);
        }catch (Exception e){
            throw new Exception(e);
        }
    }

    @Override
    public void addPlayersToClub(List<PlayerDto> players, Long sportClubId) throws Exception {
        try{
            SportClub sportClub=sportClubService.findById(sportClubId);
            for(PlayerDto newPlayer: players){
                Player player=this.playerRepository.findById(newPlayer.getId()).get();
                player.setSportClub(sportClub);
                this.playerRepository.save(player);
            }
        }catch (Exception e){
            throw new Exception(e);
        }
    }

    @Override
    public void addPlayerToClub(Long id, Long sportClubId) throws Exception {
        try{
            SportClub sportClub=sportClubService.findById(sportClubId);
            Player player=this.playerRepository.findById(id).get();
            player.setSportClub(sportClub);
            this.playerRepository.save(player);

        }catch (Exception e){
            throw new Exception(e);
        }
    }

    @Override
    public void delete(Long id) throws Exception {
        try{
            Player player=this.playerRepository.findPlayerById(id);
            if(player.getSportClub()!=null){
                player.setSportClub(null);

            }
            if(player.getSkills().size()>0){
                player.setSkills(null);
            }
            this.playerRepository.save(player);
            this.playerRepository.delete(player);
        }catch (Exception e){
            throw new Exception(e);
        }
    }


    public String saveImage(String data) throws IOException {
        String imagePath =  "";
        String imageName = "";
        String base64Image = data.split(",")[1];
        String ext = data.split(",")[0].split("/")[1].split(";")[0];
        if(ext.equals("jpeg")) {
            ext = "jpeg";
        }else if(ext.equals("png")){
            ext = "png";
        }else if(ext.equals("jpg")){
            ext = "jpg";
        }
        imageName += UUID.randomUUID() +"."+  ext;
        byte[] imageBytes = Base64.getDecoder().decode(base64Image);

        BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
        File file = new File(System.getProperty("user.dir"),"src/main/java/com/example/sportclub/assets/images/"+imageName);
        ImageIO.write(img, ext, file);
        imagePath  +=  file.getName();
        return imagePath;
    }
}
