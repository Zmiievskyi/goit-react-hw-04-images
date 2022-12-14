import React, { Component } from 'react';
import { GlobalStyle } from 'components/Common';
import { Searchbar } from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { BtnLoadMore } from 'components/Button/Button';
import { fetchApi } from '../Searchbar/fetchApi';


export default class App extends Component {
  state = {
    images: [],
    name: '',
    page: 1,
    error: false,
    isLoading: false,
    isValidate: false,
    isHidden: true,
  };

  handleSearch = name => {
    if (name === this.state.name) {
      return;
    }
    this.setState(prevState => {
      if (prevState.name === name) {
        return {
          page: prevState.page + 1,
        };
      } else {
        return {
          images: [],
          name: name,
          page: 1,
        };
      }
    });
  };

  componentDidUpdate = (_, prevState) => {
    if (
      prevState.page !== this.state.page ||
      prevState.name !== this.state.name
    ) {
      this.setState({ isValidate: false });
      this.handleApi();
    }
    if (this.state.isValidate !== prevState.isValidate) {
      this.setState({ isHidden: true });
    }
  };

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }

  handleApi = () => {
    this.setState({ isLoading: true, isHidden: true });

    setTimeout(() => {
      fetchApi(this.state.name, this.state.page)
        .then(r => {
          if (r.totalHits % r.hits.length >= 1) {
            this.setState(prevState => {
              return {
                images: [...r.hits, ...prevState.images],
                isHidden: false,
              };
            });
            return;
          }
          this.setState(prevState => {
            return {
              images: [...r.hits],
            };
          });
        })
        .catch(error => this.setState({ error: true }))
        .finally(this.setState({ isLoading: false }));
    }, 300);
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleError = e => {
    this.setState({ isValidate: e });
  };

  render() {
    const { error, images, isLoading } = this.state;

    return (
      <div style={{ textAlign: 'center' }}>
        <Searchbar
          onSubmit={this.handleSearch}
          isLoad={isLoading}
          onValidate={this.handleError}
        />
        <ImageGallery imageList={images} />
        {!this.state.isHidden && <BtnLoadMore onClick={this.handleLoadMore} />}
        {isLoading && <div>Loading...</div>}
        {error && <p>please reload page</p>}
        <GlobalStyle />
      </div>
    );
  }
}
