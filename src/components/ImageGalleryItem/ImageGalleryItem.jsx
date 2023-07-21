import { Component } from "react";
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
    state = {
        showModal: false,
    };

    onModal = () => {
        this.setState(({ showModal }) => ({ showModal: !showModal, }));
    };

  render() {
    const { showModal } = this.state;
    const { id, largeImageURL, webformatURL, tags } = this.props;
  return (
    <GalleryItem>
      <GalleryItemImage
        onClick={this.onModal}
        id={id}
        src={webformatURL}
        alt={tags}
        large={largeImageURL}
      />
      {showModal && (
        <Modal onClose={this.onModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </GalleryItem>
  );
}
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};

 