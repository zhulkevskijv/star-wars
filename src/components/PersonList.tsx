import React, { useEffect, useState } from 'react';
import swapi from 'config/axios';
import { Person, SWAPIPersonResult } from 'types';
import { AxiosResponse } from 'axios';

const PersonList = () => {
  const [persons, setPersons] = useState<Array<Person>>([]);
  useEffect(() => {
    swapi.get('/people').then((data:AxiosResponse<SWAPIPersonResult>) => { setPersons(data.data.results); });
  },[]);
  return <div>
	{persons.map((person, index) => (<h1 key={index}>{person.name}</h1>))}
  </div>;
};

export { PersonList };
