import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged: false,
    };
  }

  loggingIn = () => {
    this.setState({
      logged: true,
    });
  }

  render() {
    const { logged } = this.state;
    const { loggingIn } = this;
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/">
            { logged && <Redirect to="/search" /> }
            { !logged && <Login loggingIn={ loggingIn } />}
          </Route>
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="/" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
