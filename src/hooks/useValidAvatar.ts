import { useEffect, useState } from 'react';
import { getValidImg } from '../utils/valid-avatar';
import avatarDefault from '../assets/images/avatar.png';

export const useValidAvatar = (url: string | undefined) => {
  const [src, setSrc] = useState(avatarDefault);

  useEffect(() => {
    if (url) {
      getValidImg(url).then((isValid) => isValid && setSrc(url));
    }
    return () => setSrc(avatarDefault);
  }, [url]);

  return src;
};
