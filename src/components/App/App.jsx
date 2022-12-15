import { useState, useEffect } from 'react';
import { GlobalStyle } from 'components/Common';
import { Searchbar } from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { BtnLoadMore } from 'components/Button/Button';
import { fetchApi, perPage } from '../Searchbar/fetchApi';

export default function App() {
  const [img, setImg] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isHidden, setHidden] = useState(true);

  const handleSubmit = search => {
    if (search !== '') {
      if (search === name) {
        setPage(page + 1);
      } else {
        setImg([]);
        setPage(1);
        setName(search);
      }
    }
    return;
  };

  const handleFatch = () => {
    setHidden(true);
    setLoading(true);
    setTimeout(() => {
      fetchApi(name, page)
        .then(response => {
          const lastPage=(Math.ceil(response.total / perPage));
          if (lastPage === page) {
            setImg([...img, ...response.hits]);
            setHidden(true);
            return;
          }
          setImg([...img, ...response.hits]);
          setHidden(false);
        })
        .catch(error => setError(true))
        .finally(setLoading(false));
    }, 300);
  };

  useEffect(() => {
    if (name === '') {
      return;
    }
    handleFatch();
  }, [name, page]);


  return (
    <div style={{ textAlign: 'center' }}>
      <Searchbar
        onSubmit={handleSubmit}
        isLoad={isLoading}
      />
      <ImageGallery imageList={img} />
      {!isHidden && <BtnLoadMore onClick={() => setPage(page + 1)} />}
      {isLoading && <div>Loading...</div>}
      {error && <p>please reload page</p>}
      <GlobalStyle />
    </div>
  );
}
