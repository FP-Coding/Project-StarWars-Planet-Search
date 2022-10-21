import React from 'react';
import FilterForm from './components/FilterForm';
import Table from './components/Table';
import Provider from './context/StarWarsProvider';

function App() {
  return (
    <Provider>
      <FilterForm />
      <Table />
    </Provider>
  );
}

export default App;
