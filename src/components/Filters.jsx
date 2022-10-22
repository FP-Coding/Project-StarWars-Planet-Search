import React, { useContext } from 'react';
import styled from 'styled-components';
import StarWarsContext from '../context/StarWarsContext';
import FilterForm from './FilterForm';
import FilterOrdernationForm from './FilterOrdenationForm';
import FilterByName from './FilterByName';

const ContainerFilters = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  #btn-remove-all {
    background-color: orange;
    font-weight: bold;
    width: 15vw;
    height: 5vh;
    border-radius: 8px;
    &:hover {
      transition: 0.5s;
      background-color: red;
      color: white;
    }
  }
`;

const ContainerFiltersSortAndExcludes = styled.div`
  display: flex;
  gap: 70px;
`;

function Filters() {
  const {
    handleClickRemoveAllFilters,
  } = useContext(StarWarsContext);

  return (
    <ContainerFilters>
      <FilterByName />
      <ContainerFiltersSortAndExcludes>
        <FilterForm />
        <FilterOrdernationForm />
      </ContainerFiltersSortAndExcludes>
      <button
        type="button"
        id="btn-remove-all"
        data-testid="button-remove-filters"
        onClick={ handleClickRemoveAllFilters }
      >
        Remove All Filters
      </button>
    </ContainerFilters>
  );
}

export default Filters;
