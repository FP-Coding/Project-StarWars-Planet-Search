import React, { useContext } from 'react';
import ContainerSort from './style/ContainerSort';
import StarWarsContext from '../context/StarWarsContext';

function FilterOrdernationForm() {
  const {
    ordenationValueRadio,
    columnSort,
    handleSelectSortColumn,
    handleOrdenationClick,
    handleInputRadioOrdenation,
  } = useContext(StarWarsContext);

  const optionsSort = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  return (
    <ContainerSort>
      <div>
        <label htmlFor="column-sort">
          Column:
          <select
            id="column-sort"
            data-testid="column-sort"
            value={ columnSort }
            onChange={ handleSelectSortColumn }
          >
            { optionsSort
              .map((option) => (
                <option key={ `${option} - sort` } value={ option }>{ option }</option>
              )) }
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="asc">
          <input
            id="asc"
            name="sort"
            data-testid="column-sort-input-asc"
            type="radio"
            value="ASC"
            checked={ ordenationValueRadio === 'ASC' }
            onChange={ handleInputRadioOrdenation }
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
            checked={ ordenationValueRadio === 'DESC' }
            onChange={ handleInputRadioOrdenation }
          />
          DESC
        </label>
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleOrdenationClick }
      >
        Sort
      </button>
    </ContainerSort>
  );
}

export default FilterOrdernationForm;
