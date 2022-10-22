import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import ContainerInputFilter from './style/ContainerInputFilter';

function FilterByName() {
  const {
    filterName,
    handleInputFilterName,
  } = useContext(StarWarsContext);
  return (
    <ContainerInputFilter>
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
    </ContainerInputFilter>
  );
}

export default FilterByName;
