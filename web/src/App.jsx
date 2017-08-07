import React from 'react';

import {HashRouter, Redirect, Route, Switch, Link} from 'react-router-dom';

import {
  Frame,
  AppHome
} from './containers';

const App = () => {
  return (
    <HashRouter>
      <Frame>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={AppHome} />
        </Switch>
      </Frame>
    </HashRouter>
  )
}

export default App;