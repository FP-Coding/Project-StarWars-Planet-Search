import React, { useMemo, useEffect, useState } from 'react';
import { ReactNode } from 'prop-types';
import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [titlesTable, setTitlesTable] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterValue, setFilterValue] = useState('0');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterColumn, setFilterColumn] = useState('population');

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

  const handleInputFilterName = ({ target: { value } }) => {
    setFilterName(value);
  };

  const handleInputFilterValue = ({ target: { value } }) => {
    setFilterValue(value);
  };

  const handleSelectFilterComparison = ({ target: { value } }) => {
    setFilterComparison(value);
  };

  const handleSelectFilterColumn = ({ target: { value } }) => {
    setFilterColumn(value);
  };

  function handleClickFilter() {
    if (filterComparison === 'maior que') {
      const filtered = planets.filter((planet) => (
        Number(planet[filterColumn]) > Number(filterValue)
      ));
      setPlanets(filtered);
    }
    if (filterComparison === 'menor que') {
      const filtered = planets.filter((planet) => (
        Number(planet[filterColumn]) < Number(filterValue)
      ));
      setPlanets(filtered);
    }
    if (filterComparison === 'igual a') {
      const filtered = planets.filter((planet) => (
        Number(planet[filterColumn]) === Number(filterValue)
      ));
      setPlanets(filtered);
    }
  }

  const value = useMemo(() => ({
    planets,
    titlesTable,
    filterName,
    filterColumn,
    filterValue,
    handleInputFilterValue,
    handleSelectFilterComparison,
    handleSelectFilterColumn,
    handleInputFilterName,
    handleClickFilter,
  }), [
    planets,
    titlesTable,
    filterName,
    handleInputFilterValue,
    handleSelectFilterComparison,
    handleSelectFilterColumn,
    handleInputFilterName,
    handleClickFilter,
  ]);

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
