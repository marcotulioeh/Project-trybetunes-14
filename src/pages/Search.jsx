import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name } = this.state;
    const { onInputChange } = this;
    const min = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            type="text"
            name="name"
            onChange={ onInputChange }
            value={ name }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={ name.length < min }
            // onClick={ onClick }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
