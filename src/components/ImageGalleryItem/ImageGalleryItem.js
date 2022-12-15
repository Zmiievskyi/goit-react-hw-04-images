import { ImgModal } from 'components/Modal/Modal';
import { useState } from 'react';
import { ImgStyled } from './ImageGalleryItem.styled';

export function ImageGalleryItem (props) {
  
  const [modal, setModal] = useState(false)

    const {
      img: { webformatURL, largeImageURL, tags },
    } = props;
    return (
      <>
        <ImgStyled
          src={webformatURL}
          alt={tags}
          onClick={() => setModal(true)}
        />
        <ImgModal
          onClose={() => setModal(false)}
          isOpen={modal}
          img={largeImageURL}
        />
      </>
    );
  }

