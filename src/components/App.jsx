import { ToastContainer, toast } from 'react-toastify';
import React, { Component } from "react";

import  Searchbar  from 'components/Searchbar';
import ImageGallery from "components/ImageGallery";
import Button from 'components/Button';
import Loader from 'components/Loader';

import fetchImg from '../services/apiGallery';

import { AppContainer } from './App.styled.js';

export default class App extends Component {
  state = {
    query: '',
    items: [],
    page: 1,
    status: 'idle',
    totalHits: 0,
  };

  componentDidUpdate = async (_, prevState) => {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.fetchImages();
    }
  };

  handleSubmit = async query => {
    this.setState({
      items: [],
      query,
      totalHits: 0,
      page: 1,
    });
  };

  loadMore = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ status: 'pending' });
    try {
      const { totalHits, hits } = await fetchImg(query, page);
      console.log(hits);
      if (!totalHits) {
        this.setState({ status: 'idle' });
        return toast.warn(
          'Sorry, there are no images matching your search query. Please try again'
        );
      }

      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
        totalHits: totalHits,
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
    
  };
 
  render() {
    const { items, page, status, totalHits } = this.state;

    if (status === 'idle') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSubmit} />
        </AppContainer>
      );
    }
    if (status === 'pending') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={items} />
       <Loader />
        </AppContainer>
      );
    }

    if (status === 'rejected') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={items} />
          {toast.error('An error occurred. Please try again later.')}
        </AppContainer>
      );
    }
    if (status === 'resolved') {
      return (
        <AppContainer>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={items} />
          {totalHits && items.length && <Button onClick={this.loadMore} />}
          <ToastContainer autoClose={4000} />
        </AppContainer>
      );
    }
  }
};

