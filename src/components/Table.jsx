import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const {
    planets,
    titlesTable,
    filterName,
    filterValue,
    filterComparison,
    filterColumn,
    isFilteringBySomeColumnNumber,
  } = useContext(StarWarsContext);
  const planetsWithFilter = isFilteringBySomeColumnNumber
    ? planets.filter((planet) => {
      switch (filterComparison) {
      case 'maior que':
        return Number(planet[filterColumn]) > Number(filterValue);
      case 'menor que':
        return Number(planet[filterColumn]) < Number(filterValue);
      case 'igual a':
        return Number(planet[filterColumn]) === Number(filterValue);
      default:
        return planet;
      }
    }) : planets;

  return (
    <table>
      <thead>
        <tr>
          { planets.length !== 0 && titlesTable.map((title) => (
            <th key={ title }>{ title.replace('_', ' ').toUpperCase() }</th>
          )) }
        </tr>
      </thead>
      <tbody>
        { planets.length !== 0 && planetsWithFilter
          .filter(({ name: namePlanet }) => namePlanet.includes(filterName))
          .map(({
            name,
            rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: surfaceWater,
            population,
            films,
            created,
            edited,
            url,
          }) => (
            <tr key={ name }>
              <td>
                {name}
              </td>
              <td>
                {rotationPeriod}
              </td>
              <td>
                {orbitalPeriod}
              </td>
              <td>
                { diameter }
              </td>
              <td>
                { climate }
              </td>
              <td>
                { gravity }
              </td>
              <td>
                { terrain }
              </td>
              <td>
                { surfaceWater }
              </td>
              <td>
                { population }
              </td>
              <td>
                { films }
              </td>
              <td>
                { created }
              </td>
              <td>
                { edited }
              </td>
              <td>
                { url }
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
