import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, StaticRouter, Route, Switch, Link} from "react-router-dom";


import getApolloClient from '../client/ApolloClient';

import Rick from './Rick';
import Morty from './Morty';
import Earth from './Earth';

const isServer = typeof window === 'undefined';

const Router = isServer ? StaticRouter : BrowserRouter;

const App = ({url, context}) => {
  return (
    <Router location={url} context={context}>
      <ApolloProvider client={getApolloClient()}>
        <div>
          Hello this is a simple SSR app.
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/rick">Rick</Link>
            </li>
            <li>
              <Link to="/morty">Morty</Link>
            </li>
            <li>
              <Link to="/Earth">Earth</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/rick" component={Rick} />
          <Route path="/morty" component={Morty} />
          <Route path="/earth" component={Earth} />
        </Switch>
      </ApolloProvider>
    </Router>
  )
};

export default App;
