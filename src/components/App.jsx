import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';

import  Searchbar  from 'components/Searchbar';
import ImageGallery from "components/ImageGallery";
import Button from 'components/Button';
import Loader from 'components/Loader';

import fetchImg from '../services/apiGallery';

import { AppContainer, Message } from './App.styled.js';

const App = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query)
      return;
    const fetchImages = async () => {
      try {
        setStatus('pending');
        const { totalHits, hits } = await fetchImg(query, page);
        if (!totalHits) {
          setStatus('idle');
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again'
          );
          return;
        }
        const images = hits.map(hit => ({
          id: hit.id,
          webformatURL: hit.webformatURL,
          largeImageURL: hit.largeImageURL,
          tags: hit.tags,
        }));
        setItems(prevItem => [...prevItem, ...images]);
        setStatus('resolved');
        setTotalHits(totalHits);
      }
      catch (error) {
        setStatus('rejected');
      }
    };
    
    fetchImages();

  }, [page, query]);

 const handleSubmit = query => {
   setItems([]);
   setQuery(query);
   setTotalHits(0);
   setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

    if (status === 'idle') {
      return (
        <AppContainer>
          <Searchbar onSubmit={handleSubmit} />
        </AppContainer>
      );
    }
    if (status === 'pending') {
      return (
        <AppContainer>
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery page={page} items={items} />
       <Loader />
        </AppContainer>
      );
  }
  
   if (status === 'rejected') {
     return (
       <AppContainer>
         <Searchbar onSubmit={handleSubmit} />
         <Message>Щось пішло не так</Message>
       </AppContainer>
     );
   }
   
    if (status === 'resolved') {
      return (
        <AppContainer>
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery page={page} items={items} />
          {totalHits !== items.length && <Button onClick={loadMore} />}
        </AppContainer>
      );
  }

};

export default App;


