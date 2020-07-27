import React from 'react';

import useGetCharacterApi from '../api/character';

const App = ({serverData}) => {
  const [{ data }] = useGetCharacterApi(serverData);
  return (
    <div>
      Hello this is a simple SSR app.{!!data ? data.id : null}
    </div>
  )
};

export default App;
