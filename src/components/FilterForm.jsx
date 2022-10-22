import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import ContainerFilterForm from './style/ContainerFilterForm';

function FilterForm() {
  const {
    filterValue,
    filterComparison,
    filterColumn,
    filters,
    optionsFilter,
    handleClickRemoveFilter,
    handleInputFilterValue,
    handleSelectFilterComparison,
    handleSelectFilterColumn,
    handleClickFilter,
  } = useContext(StarWarsContext);

  return (
    <ContainerFilterForm>
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
            data-testid={ `rmv-filtro-${filterObject.filterColumn}` }
          >
            Remover Filtro
          </button>
        </p>
      )) }
    </ContainerFilterForm>
  );
}

export default FilterForm;
