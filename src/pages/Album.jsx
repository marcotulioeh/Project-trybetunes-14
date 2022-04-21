import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
      musics: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const albumMusics = await getMusics(id);
    this.setState({
      album: albumMusics[0],
      musics: albumMusics.filter((disc) => disc.trackId !== undefined),
    });
  }

  render() {
    const {
      album,
      musics,
    } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-album">
          <img src={ album.artworkUrl100 } alt="" />
          <h1 data-testid="artist-name">
            {album.artistName}
          </h1>
          <h2 data-testid="album-name">
            {album.collectionName}
          </h2>
          <div />
          <div className="musicPreview">
            { musics
              .map((disc) => <MusicCard key={ disc.trackId } disc={ disc } />)}
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default Album;
