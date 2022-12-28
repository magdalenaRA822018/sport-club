import { useState } from 'react';

const initialState = {
    convertedImage: null,
    convert: null
};

const useUploadImage = (props: File | null) => {
  const [image, setImage] = useState('');

  const convertImage = () => {
    const reader = new FileReader()
    if(props){
       reader.onloadend = () => {
           if(reader.result)
                setImage(reader.result.toString())
       }
       reader.readAsDataURL(props);
    }
 }


return {
  convertedImage: image,
  convert: convertImage
};

  
};

export default useUploadImage;
