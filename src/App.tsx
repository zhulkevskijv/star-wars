import React from 'react';
import { PersonList } from './components';
import { ReactComponent as StarWarsLogo } from 'assets/Logo.svg';
const App = () => {
  return (
    <div>
      <StarWarsLogo/>
      <PersonList/>
    </div>
  );
};

export default App;
