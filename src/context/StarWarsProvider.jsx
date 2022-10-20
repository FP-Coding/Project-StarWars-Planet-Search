import React, { useMemo, useEffect, useState } from 'react';
import { ReactNode } from 'prop-types';
import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [api, setDataApi] = useState([]);
  const [titlesTable, setTitlesTable] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterValue, setFilterValue] = useState('0');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterColumn, setFilterColumn] = useState('population');
  const [filters, setFilters] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

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
      setDataApi(responsePlanetsApiFilteringResidents);
    };
    getPlanetsApi();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filteringPlanets = () => {
    filters.forEach(({
      filterValue: filterByValue,
      filterComparison: filterByComparison,
      filterColumn: filterByColumn,
    }) => {
      if (filterByComparison === 'maior que') {
        const filtered = planets.filter((planet) => (
          Number(planet[filterByColumn]) > Number(filterByValue)
        ));
        setPlanets(filtered);
      }
      if (filterByComparison === 'menor que') {
        const filtered = planets.filter((planet) => (
          Number(planet[filterByColumn]) < Number(filterByValue)
        ));
        setPlanets(filtered);
      }
      if (filterComparison === 'igual a') {
        const filtered = planets.filter((planet) => (
          Number(planet[filterByColumn]) === Number(filterByValue)
        ));
        setPlanets(filtered);
      }
    });
    setIsFiltering(false);
  };

  useEffect(() => {
    if (isFiltering) {
      filteringPlanets();
    }
  }, [isFiltering, filteringPlanets]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInputFilterName = ({ target: { value } }) => {
    setFilterName(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInputFilterValue = ({ target: { value } }) => {
    setFilterValue(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSelectFilterComparison = ({ target: { value } }) => {
    setFilterComparison(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSelectFilterColumn = ({ target: { value } }) => {
    setFilterColumn(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickFilter = () => {
    setFilters((prev) => [
      ...prev, {
        filterValue,
        filterComparison,
        filterColumn,
      },
    ]);
    setIsFiltering(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickRemoveFilter = (object) => {
    const arrayWithoutFilterParam = filters
      .filter(({ filterValue: filterByValue }) => filterByValue !== object.filterValue);
    setPlanets(api);
    setFilters(arrayWithoutFilterParam);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickRemoveAllFilters = () => {
    setFilters([]);
    setPlanets(api);
  };

  const value = useMemo(() => ({
    planets,
    titlesTable,
    filterName,
    filterColumn,
    filterValue,
    filters,
    handleClickRemoveAllFilters,
    handleClickRemoveFilter,
    handleInputFilterValue,
    handleSelectFilterComparison,
    handleSelectFilterColumn,
    handleInputFilterName,
    handleClickFilter,
  }), [
    filters,
    planets,
    titlesTable,
    filterName,
    filterColumn,
    filterValue,
    handleClickRemoveAllFilters,
    handleClickRemoveFilter,
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
