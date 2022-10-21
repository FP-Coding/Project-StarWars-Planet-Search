import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import dataApi from "./mocks/testData";

describe("verificando Form", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(dataApi),
      })
    );
  });

  test("se o input de nome do planeta filtra corretamente ", async () => {
    render(<App />);
    expect(fetch).toHaveBeenCalled();
    const filterInputName = screen.getByTestId("name-filter");
    expect(filterInputName).toBeInTheDocument();
    userEvent.type(filterInputName, "oo");
    expect(filterInputName).toHaveValue("oo");
    const planets = await screen.findAllByTestId("planet-name");
    expect(planets).toHaveLength(2);
  });

  test("Verifica se os filtros por operador e coluna funcionam ", async () => {
    render(<App />);
    const selectColumnFilter = screen.getByTestId("column-filter");
    expect(selectColumnFilter).toBeInTheDocument();
    const selectOperatorFilter = screen.getByTestId("comparison-filter");
    expect(selectOperatorFilter).toBeInTheDocument();
    const quantityComparison = screen.getByRole("spinbutton", {
      name: /quantity:/i,
    });
    expect(quantityComparison).toBeInTheDocument();

    const btnFilter = screen.getByRole('button', {  name: /filter/i});
    expect(btnFilter).toBeInTheDocument();
    
    await waitFor(() => {
      const planets = screen.getAllByTestId("planet-name");
      expect(planets).toHaveLength(10);
    }, { timeout: 50000 })
    
    
    userEvent.selectOptions(selectColumnFilter, "diameter");
    userEvent.selectOptions(selectOperatorFilter, "maior que");
    userEvent.clear(quantityComparison)
    userEvent.type(quantityComparison, '9000')
    
    userEvent.click(btnFilter);

    await waitFor(() => {
      const planets = screen.getAllByTestId("planet-name");
      expect(planets).toHaveLength(7);
    }, { timeout: 50000 })

    userEvent.selectOptions(selectColumnFilter, "population");
    userEvent.selectOptions(selectOperatorFilter, "menor que");
    userEvent.clear(quantityComparison)
    userEvent.type(quantityComparison, '1000000')

    userEvent.click(btnFilter);

    await waitFor(() => {
      const planets = screen.getAllByTestId("planet-name");
      expect(planets).toHaveLength(2);
    }, { timeout: 50000 })

    userEvent.selectOptions(selectColumnFilter, "rotation_period");
    userEvent.selectOptions(selectOperatorFilter, "igual a");
    userEvent.clear(quantityComparison)
    userEvent.type(quantityComparison, '23')

    userEvent.click(btnFilter);

    await waitFor(() => {
      const planets = screen.getAllByTestId("planet-name");
      expect(planets).toHaveLength(1);
    }, { timeout: 50000 })

    
    const filterApllyed = screen.getByText(/diameter maior que 9000/i);
    expect(filterApllyed).toBeInTheDocument()
    const buttonFirstFilter = screen.getByTestId('rmv-filtro-diameter');
    expect(buttonFirstFilter).toBeInTheDocument()

    const secondFilterApllyed = screen.getByText(/population menor que 1000000/i)
    expect(secondFilterApllyed).toBeInTheDocument()
    const buttonSecondFilter = screen.getByTestId('rmv-filtro-population');
    expect(buttonSecondFilter).toBeInTheDocument()

    const thirdFilterApplyed = screen.getByText(/rotation_period igual a 23/i)
    expect(thirdFilterApplyed).toBeInTheDocument()
    const buttonThirdFilter = screen.getByTestId('rmv-filtro-rotation_period');
    expect(buttonThirdFilter).toBeInTheDocument()


    userEvent.click(buttonThirdFilter)

    expect(thirdFilterApplyed).not.toBeInTheDocument()

    const removeAllFilters = screen.getByTestId('button-remove-filters');
    expect(removeAllFilters).toBeInTheDocument()

    userEvent.click(removeAllFilters)

    expect(filterApllyed).not.toBeInTheDocument()
    expect(secondFilterApllyed).not.toBeInTheDocument()
  });
  jest.setTimeout('10000')
  test('se a ordenação funciona', async () => {
    render(<App/>)
    const getPlanets = await screen.findAllByTestId('planet-name')
    expect(getPlanets[0].innerHTML).toBe('Tatooine')
    const selectColumnSort = screen.getByTestId("column-sort");
    expect(selectColumnSort).toBeInTheDocument();

    const inputRadioAsc = screen.getByTestId('column-sort-input-asc')
    expect(inputRadioAsc).toBeInTheDocument()

    const inputRadioDesc = screen.getByTestId('column-sort-input-desc')
    expect(inputRadioDesc).toBeInTheDocument()

    userEvent.selectOptions(selectColumnSort, 'population')
    userEvent.click(inputRadioDesc)
    expect(inputRadioDesc.checked).toBeTruthy()

    const btnOrdenar = screen.getByTestId('column-sort-button')
    expect(btnOrdenar).toBeInTheDocument();
    
    userEvent.click(btnOrdenar);

    const getPlanetsOrderedDesc =  await screen.findAllByTestId('planet-name')
    expect(getPlanetsOrderedDesc[0].innerHTML).toBe('Coruscant')

    userEvent.selectOptions(selectColumnSort, 'population')
    userEvent.click(inputRadioAsc)
    expect(inputRadioAsc.checked).toBeTruthy()

    userEvent.click(btnOrdenar);


    const getPlanetsOrderedAsc =  await screen.findAllByTestId('planet-name')
    expect(getPlanetsOrderedAsc[0].innerHTML).toBe('Yavin IV')

  })
});
