import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import ApolloClient from '../client/ApolloClient';

import Character from './Character';

const App = () => {
  return (
    <ApolloProvider client={ApolloClient}>
      <div>
        Hello this is a simple SSR app.
      </div>
      <Character />
    </ApolloProvider>
  )
};

export default App;
