import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

const QUERY = gql`
    {
        character (id: 1) {
            name
        }
    }
`;

const Character = () => {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
};

export default Character;
