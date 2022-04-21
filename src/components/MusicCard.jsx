import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import {
  addSong,
  getFavoriteSongs,
} from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      logged: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      logged: true,
    });
    const { disc: { trackId } } = this.props;
    const getFavorite = await getFavoriteSongs();
    const favorite = getFavorite.some((get) => get.trackId === trackId);
    this.setState({
      favorite,
    }, () => this.setState({
      logged: false,
    }));
  }

  favoriteChecked = ({ target }) => {
    this.setState({
      favorite: target.checked,
    }, () => this.addFavorite());
  }

  addFavorite = async () => {
    this.setState({ logged: true });
    const { favorite } = this.state;
    const { disc } = this.props;
    if (favorite) {
      await addSong(disc);
    }
    this.setState({ logged: false });
  }

  render() {
    const { disc } = this.props;
    const { trackName, previewUrl, trackId } = disc;
    const { favorite, logged } = this.state;
    return (
      <div>
        { logged && <Loading />}
        { !logged && (
          <>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              <input
                id={ trackId }
                type="checkbox"
                checked={ favorite }
                onChange={ (event) => this.favoriteChecked(event) }
                data-testid={ `checkbox-music-${trackId}` }
              />
              Favorita
            </label>

          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  disc: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
