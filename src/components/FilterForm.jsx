import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterForm() {
  const {
    filterName,
    filterValue,
    filterComparison,
    filterColumn,
    filters,
    optionsFilter,
    handleClickRemoveAllFilters,
    handleClickRemoveFilter,
    handleInputFilterName,
    handleInputFilterValue,
    handleSelectFilterComparison,
    handleSelectFilterColumn,
    handleClickFilter,
  } = useContext(StarWarsContext);

  const optionsSort = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

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
          { optionsFilter
            .map((option) => (
              <option key={ `${option} - filter` } value={ option }>{ option }</option>
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
      <div>
        <label htmlFor="column-sort">
          Column:
          <select
            id="column-sort"
            data-testid="column-sort"
            value={ filterColumn }
            onChange={ handleSelectFilterColumn }
          >
            { optionsSort
              .map((option) => (
                <option key={ `${option} - sort` } value={ option }>{ option }</option>
              )) }
          </select>
        </label>
        <label htmlFor="asc">
          <input
            id="asc"
            name="sort"
            data-testid="column-sort-input-asc"
            type="radio"
            value="ASC"
          />
          ASC
        </label>
        <label htmlFor="desc">
          <input
            id="desc"
            name="sort"
            data-testid="column-sort-input-desc"
            type="radio"
            value="DESC"
          />
          DESC
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
        >
          Ordernar
        </button>
      </div>
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
