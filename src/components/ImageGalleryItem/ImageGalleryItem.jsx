import { useState } from "react";
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

function ImageGalleryItem({ id, webformatURL, largeImageURL, tags }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <GalleryItem>
      <GalleryItemImage
        onClick={() => setShowModal(true)}
        id={id}
        src={webformatURL}
        alt={tags}
        large={largeImageURL}
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};

export default ImageGalleryItem;

