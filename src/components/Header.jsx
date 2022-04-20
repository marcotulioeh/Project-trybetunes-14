import React from 'react';
// import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      logged: true,
    };
  }

  componentDidMount = async () => {
    const object = await getUser();
    this.setState({
      name: object.name,
      logged: false,
    });
  }

  render() {
    const { name, logged } = this.state;
    return (
      <>
        <header data-testid="header-component">
          <h1>TrybeTunes</h1>
          <h2 data-testid="header-user-name">{ name }</h2>
        </header>
        { logged && <Loading />}
      </>
    );
  }
}

export default Header;
