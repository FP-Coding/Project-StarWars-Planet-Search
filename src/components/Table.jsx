import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TableData from './style/TableData';

function Table() {
  const {
    planets,
    titlesTable,
    filterName,
  } = useContext(StarWarsContext);
  return (
    <TableData>
      <thead>
        <tr>
          { planets.length !== 0 && titlesTable.map((title) => (
            <th key={ title }>{ title.replace('_', ' ').toUpperCase() }</th>
          )) }
        </tr>
      </thead>
      <tbody>
        { planets.length !== 0 && planets
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
            <tr key={ name } data-testid="planet-row">
              <td data-testid="planet-name">
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
    </TableData>
  );
}

export default Table;
