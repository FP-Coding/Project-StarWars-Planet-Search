import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterForm() {
  const {
    filterName,
    filterValue,
    filterComparison,
    filterColumn,
    filters,
    handleClickRemoveAllFilters,
    handleClickRemoveFilter,
    handleInputFilterName,
    handleInputFilterValue,
    handleSelectFilterComparison,
    handleSelectFilterColumn,
    handleClickFilter,
  } = useContext(StarWarsContext);

  const optionsFilterColumn = [
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
    'population',
  ];

  const useredFilters = filters.map(({ filterColumn: columnName }) => columnName);
  const optionsFiltered = optionsFilterColumn.filter((option) => (
    !useredFilters.includes(option) && option
  ));

  return (
    <div>
      <label htmlFor="name-filter">
        Filter by Name:
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          value={ filterName }
          onChange={ handleInputFilterName }
        />
      </label>
      <label htmlFor="column-filter">
        Column:
        <select
          id="column-filter"
          data-testid="column-filter"
          value={ filterColumn }
          onChange={ handleSelectFilterColumn }
        >
          { optionsFiltered
            .map((option) => (
              <option key={ option } value={ option }>{ option }</option>
            )) }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Type:
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ filterComparison }
          onChange={ handleSelectFilterComparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Quantity:
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          value={ filterValue }
          onChange={ handleInputFilterValue }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickFilter }
      >
        Filter
      </button>
      { filters.map((filterObject) => (
        <p data-testid="filter" key={ filterObject.filterValue }>
          { `${filterObject.filterColumn} 
          ${filterObject.filterComparison} 
          ${filterObject.filterValue}` }
          <button
            type="button"
            onClick={ () => handleClickRemoveFilter(filterObject) }
          >
            Remover Filtro

          </button>
        </p>
      )) }
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleClickRemoveAllFilters }
      >
        Remover Filtros
      </button>
    </div>
  );
}

export default FilterForm;
