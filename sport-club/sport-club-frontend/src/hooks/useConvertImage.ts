import { useEffect, useState } from 'react';
export const useConvertImage = (file: File | null) => {
  const [image, setImage] = useState('');

  useEffect(()=>{
        const reader = new FileReader()
        if(file){
          reader.onloadend = () => {
              if(reader.result)
                    setImage(reader.result.toString())
          }
          reader.readAsDataURL(file);
        }
  }, [file])


  return {
    convertedImage: image,
  };

};
