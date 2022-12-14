import { ImgModal } from 'components/Modal/Modal';
import { Component } from 'react';
import { ImgStyled } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      img: { webformatURL, largeImageURL, tags },
    } = this.props;
    return (
      <>
        <ImgStyled src={webformatURL} alt={tags} onClick={this.openModal} />
        <ImgModal
          onClose={this.closeModal}
          isOpen={this.state.isModalOpen}
          img={largeImageURL}
        />
      </>
    );
  }
}
