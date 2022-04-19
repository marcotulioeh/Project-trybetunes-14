import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      buttonEnter: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  login = async () => {
    this.setState({
      buttonEnter: true,
    });
    const { name } = this.state;
    await createUser({ name });
    const { loggingIn } = this.props;
    loggingIn();
  }

  render() {
    const { onInputChange, login } = this;
    const { name, buttonEnter } = this.state;
    const min = 3;

    return (
      <div data-testid="page-login">
        {!buttonEnter
          && <Form
            onChange={ onInputChange }
            value={ name }
            disabled={ name.length < min }
            onClick={ login }
          />}
        { buttonEnter && <Loading />}
      </div>
    );
  }
}

Login.propTypes = {
  loggingIn: PropTypes.func.isRequired,
};

export default Login;
