import React, { useEffect, useState } from 'react';
import swapi from 'config/axios';
import { Person, SWAPIPersonResult } from 'types';
import { AxiosResponse } from 'axios';
import styled from 'styled-components';


const StyledList = styled.div`
  .list-item{
    color: ${props => props.theme.primaryColor};
    padding: 10px;
    border-bottom: 1px grey solid;
    &:first-child{
      border-top: 1px grey solid;
    }
  }
`;

const PersonList = () => {
  const [persons, setPersons] = useState<Array<Person>>([]);
  useEffect(() => {
    swapi.get('/people').then((data:AxiosResponse<SWAPIPersonResult>) => { setPersons(data.data.results); });
  },[]);

  const computeId = (person: Person): string => {
    const extractedId = person.url.match(/\d+/);
    return extractedId ? extractedId.toString() : "";
  };
  return <div>
    <StyledList>
      {persons.map((person, index) => (<div className="list-item" key={index}>{computeId(person)}. {person.name}</div>))}
    </StyledList>
    </div>;
};

export { PersonList };
