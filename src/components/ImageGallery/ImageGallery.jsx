import ImageGalleryItem from 'components/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';


const ImageGallery = ({ items }) => {
  return (
    <Gallery>
      {items.map(({ id, largeImageURL, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          largeImageURL={largeImageURL}
          webformatURL={webformatURL}
          tags={tags}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;

