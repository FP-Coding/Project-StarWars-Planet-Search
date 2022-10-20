import React, { useMemo, useEffect, useState } from 'react';
import { ReactNode } from 'prop-types';
import StarWarsContext from './StarWarsContext';

const optionsFilterColumn = [
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
  'population',
];

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
  const [optionsFilter, setOptions] = useState(optionsFilterColumn);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterOption = () => {
    const useredFilters = filters.map(({ filterColumn: columnName }) => columnName);
    const optionsFiltered = optionsFilter.filter((option) => (
      !useredFilters.includes(option) && option
    ));
    setOptions(optionsFiltered);
  };

  useEffect(() => {
    if (isFiltering) {
      filterOption();
      filteringPlanets();
    }
  }, [isFiltering, filteringPlanets, filterOption]);

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
      .filter(({ filterColumn: filterByColumn }) => (
        filterByColumn !== object.filterColumn));
    console.log(arrayWithoutFilterParam);
    setFilters(arrayWithoutFilterParam);
    setPlanets(api);
    setIsFiltering(true);
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
    optionsFilter,
    handleClickRemoveAllFilters,
    handleClickRemoveFilter,
    handleInputFilterValue,
    handleSelectFilterComparison,
    handleSelectFilterColumn,
    handleInputFilterName,
    handleClickFilter,
  }), [
    optionsFilter,
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
