import { useEffect, useState } from 'react';

export const useConvertImage = () => {

  const [image, setImage] = useState('');
  const [imageFile,setImageFile] =useState<File | null>(null);

  useEffect(()=>{
    console.log(imageFile)
        const reader = new FileReader()
        if(imageFile){
         
          reader.onloadend = () => {
            console.log("reader")
              if(reader.result){
                    setImage(reader.result.toString())
                    reader.readAsDataURL(imageFile);
              }
          }
          
        }
        
        
  }, [imageFile])

  const extractFileFromEvent=(event: React.ChangeEvent)=>{
    console.log("extractFileFromEvent")
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImageFile(file)
  }

  return {
    convertedImage: image,
    extractFileFromEvent: extractFileFromEvent
  };

};
