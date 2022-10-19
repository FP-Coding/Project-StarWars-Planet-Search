import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterForm() {
  const {
    filterName,
    handleInputFilterName,
  } = useContext(StarWarsContext);
  return (
    <label htmlFor="name-filter">
      Filter by Name:
      <input
        id="name-filter"
        data-testid="name-filter"
        value={ filterName }
        onChange={ handleInputFilterName }
      />
    </label>
  );
}

export default FilterForm;
