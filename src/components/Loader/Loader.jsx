import { LoaderContainer } from './Loader.styled';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <LoaderContainer>
      <InfinitySpin width="200" color='#3f51b5' />
    </LoaderContainer>
  );
};

export default Loader;
