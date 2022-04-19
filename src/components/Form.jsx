import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      onChange,
      value,
      disabled,
      onClick,
    } = this.props;
    return (
      <form action="">
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="name"
            onChange={ onChange }
            value={ value }
            data-testid="login-name-input"
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ onClick }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Form;
