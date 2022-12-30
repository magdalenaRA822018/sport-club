import React ,{ useEffect, useState } from 'react';

export const useConvertImage = (): [string, (event: React.ChangeEvent) => void, React.Dispatch<React.SetStateAction<string>>] => {
  const [image, setImage] = useState('');
  const [imageFile,setImageFile] =useState<File | null>(null);

  useEffect(()=>{
        const reader = new FileReader()
        if(imageFile){
          reader.onloadend = () => {
              if(reader.result)
                  setImage(reader.result.toString())
          } 
          reader.readAsDataURL(imageFile);  
        }
  }, [imageFile])

  const extractFileFromEvent = (event: React.ChangeEvent)=>{
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImageFile(file)
  }

  return [image, extractFileFromEvent, setImage];
};
