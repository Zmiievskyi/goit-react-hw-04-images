import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { UlStyled, LiStyled } from './ImageGallery.styled';


export default function ImageGallery (props) {
  
    return (
      <UlStyled>
        {props.imageList.map(item => (
          <LiStyled key={item.id}>
            <ImageGalleryItem
              img={item}
              onModalOpen={props.onSelect}
            />
          </LiStyled>
        ))}
        
      </UlStyled>
    );
  }

