package com.example.sportclub.mapper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Base64;

public class ImageMapper {

    public String decodeBase64(String image) {
        File currDir = new File(System.getProperty("user.dir"));
        File assetFolder = new File(currDir, "src/main/java/com/example/sportclub/assets/images");
        File imagePath = new File(assetFolder, image);
        String encodedFile = "";
        try {
            FileInputStream fileInputStreamReader = new FileInputStream(imagePath);
            byte[] bytes = new byte[(int)imagePath.length()];
            fileInputStreamReader.read(bytes);
            encodedFile = Base64.getEncoder().encodeToString(bytes);

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "data:image/png;base64," + encodedFile;
    }
}
