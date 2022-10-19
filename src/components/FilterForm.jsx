import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterForm() {
  const [filterValue, setFilterValue] = useState('0');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterColumn, setFilterColumn] = useState('population');

  const {
    filterName,
    handleInputFilterName,
    handleClickFilter,
  } = useContext(StarWarsContext);

  const handleInputFilterValue = ({ target: { value } }) => {
    setFilterValue(value);
  };

  const handleSelectFilterComparison = ({ target: { value } }) => {
    setFilterComparison(value);
  };

  const handleSelectFilterColumn = ({ target: { value } }) => {
    setFilterColumn(value);
  };

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
        onClick={ () => handleClickFilter(filterValue, filterComparison, filterColumn) }
      >
        Filter
      </button>
    </div>
  );
}

export default FilterForm;
