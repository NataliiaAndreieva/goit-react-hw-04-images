import axios from 'axios';
import { Notify } from 'notiflix';

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '36047185-510fc5005b993828af62621e5',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

export const fetchImg = async (query, page, per_page) => {
  const params = {
    q: query,
    page,
    per_page,
  };

  try {
    const { data } = await pixabayApi.get('/', { params });
    
    return data;
  } catch (e) {
    Notify.failure('error');
  }
};

export default fetchImg;

