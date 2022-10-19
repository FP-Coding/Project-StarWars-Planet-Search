import React, { useMemo, useEffect, useState } from 'react';
import { ReactNode } from 'prop-types';
import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [titlesTable, setTitlesTable] = useState([]);

  useEffect(() => {
    const getPlanetsApi = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const requestPlanetsApi = await fetch(endpoint);
      const responsePlanetsApi = await requestPlanetsApi.json();
      const responsePlanetsApiFilteringResidents = responsePlanetsApi.results
        .map((planet) => {
          delete (planet.residents);
          return planet;
        });
      setTitlesTable(Object.keys(responsePlanetsApiFilteringResidents[0]));
      setPlanets(responsePlanetsApiFilteringResidents);
    };
    getPlanetsApi();
  }, []);

  console.log(planets);
  const value = useMemo(() => ({
    planets,
    titlesTable,
  }), [planets, titlesTable]);

  return (
    <StarWarsContext.Provider value={ value }>
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: ReactNode,
}.isRequired;

export default Provider;
