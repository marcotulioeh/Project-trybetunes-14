import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { disc } = this.props;
    const { trackName, previewUrl } = disc;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  disc: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    // trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
