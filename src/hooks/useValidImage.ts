import { useEffect, useState } from 'react';
import { getValidImg } from '../utils/valid-avatar';
import imageDefault from '../assets/images/avatar.png';

export const useValidImage = (url: string | undefined) => {
  const [src, setSrc] = useState(imageDefault);

  useEffect(() => {
    if (url) {
      getValidImg(url).then((isValid) => isValid && setSrc(url));
    }
    return () => setSrc(imageDefault);
  }, [url]);

  return src;
};
