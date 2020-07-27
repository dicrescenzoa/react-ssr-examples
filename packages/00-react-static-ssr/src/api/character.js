import React, {useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch';

const getCharacter = async () => {
  return fetch('https://rickandmortyapi.com/api/character/2')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      return data;
    });
};

const useGetCharacterApi = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await getCharacter();
        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return [{ data, isLoading, isError }];
};

export default useGetCharacterApi;
