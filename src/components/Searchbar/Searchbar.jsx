import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';
import { Header, SearchForm, SearchButton, SearchFormInput, } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    query: '',
  };
  
  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    const { query } = this.state;
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please, enter correct search word!');
      return;
    }
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };
  
  render() {
    const { query } = this.state;
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <FcSearch
              style={{ fill: '#3f51b5', height: '25px', width: '25px' }}
            />
          </SearchButton>

          <SearchFormInput
            onChange={this.handleChange}
            className="input"
            type="text"
            name="query"
            value={query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};






// import { Formik, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { Header } from './Searchbar.styled';
// import { FcSearch } from 'react-icons/fc';

// let searchSchema = Yup.object().shape({
//     searchQuery: Yup.string().required('Required!'),
// });

// const Searchbar = ({ onSubmit }) => {
//     const handleSubmit = (values, { setSubmitting }) => {
//         onSubmit(values);
//         setSubmitting(false);
//     };

//     return (
//       <Header>
//         <Formik
//           initialValues={{ searchQuery: '' }}
//           validationSchema={searchSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <button type="submit" disabled={isSubmitting}>
//                 <FcSearch size={25} />
//               </button>

//               <input
//                 type="text"
//                 autoComplete="off"
//                 autoFocus
//                 name="searchQuery"
//                 placeholder="Search images and photos"
//               />
//               <ErrorMessage name="searchQuery" component="div" />
//             </Form>
//           )}
//         </Formik>
//       </Header>
//     );
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// export default Searchbar;