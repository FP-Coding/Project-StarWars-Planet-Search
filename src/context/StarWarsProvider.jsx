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
  const [
    isFilteringBySomeColumnNumber,
    setIsFilteringBySomeColumnNumber,
  ] = useState(false);

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

  const handleClickFilter = (value, comparison, column) => {
    setFilterValue(value);
    setFilterComparison(comparison);
    setFilterColumn(column);
    setIsFilteringBySomeColumnNumber(true);
  };

  const value = useMemo(() => ({
    planets,
    titlesTable,
    filterName,
    filterValue,
    filterComparison,
    filterColumn,
    isFilteringBySomeColumnNumber,
    handleInputFilterName,
    handleClickFilter,
  }), [
    planets,
    titlesTable,
    filterName,
    filterValue,
    filterComparison,
    filterColumn,
    isFilteringBySomeColumnNumber,
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
