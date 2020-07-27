import React from 'react';

import useGetCharacterApi from '../api/character';

const App = () => {
  const [{ data }] = useGetCharacterApi();
  return (
    <div>
      Hello this is a simple SSR app. {!!data ? data.id : ''}
    </div>
  )
};

export default App;
