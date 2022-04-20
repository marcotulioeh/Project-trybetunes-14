import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      artist: '',
      logged: false,
      album: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  searchResult = (searchApi) => searchApi.map((key) => {
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = key;
    return (
      <section key={ collectionId }>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <div>
          <h2>{ collectionName }</h2>
          <p>{ artistName }</p>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            Saiba mais
          </Link>
        </div>
      </section>
    );
  });

  searchButton = async () => {
    this.setState({
      name: '',
      logged: true,
    });
    const { name } = this.state;
    const searchApi = await searchAlbumsAPI(name);
    this.setState({
      logged: false,
    });
    if (searchApi[0] === undefined) {
      return this.setState({
        album: <h2>Nenhum álbum foi encontrado</h2>,
      });
    }
    this.setState({
      artist: name,
      album: this.searchResult(searchApi),
    });
  }

  render() {
    const {
      name,
      artist,
      logged,
      album,
    } = this.state;
    const { onInputChange, searchButton } = this;
    const min = 2;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form action="">
            <input
              placeholder="Nome do Artista"
              type="text"
              name="name"
              onChange={ onInputChange }
              value={ name }
              data-testid="search-artist-input"
            />
            <button
              type="button"
              disabled={ name.length < min }
              onClick={ searchButton }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
          {logged && <Loading /> }
          {album.length > 0 && (
            <div>
              <h2>
                {`Resultado de álbuns de: ${artist}`}
              </h2>
            </div>
          )}
          <div>
            { album }
          </div>
        </div>
      </>
    );
  }
}

export default Search;
