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
  const [people, setPeople] = useState<Array<Person>>([]);

  const getPage = (url:string) :Promise<SWAPIPersonResult | void> => swapi.get(url)
    .then((response:AxiosResponse<SWAPIPersonResult>) => Promise.resolve(response.data))
    .catch(error => console.log("Problem occurred during fetching!", error));

  /* eslint-disable no-unused-vars */
  const getAllPages  = async (url : string, processResults : (people:Array<Person>) => void) => {
    const data = await getPage(url);
    if (data){
      processResults(data.results);
      if (data.next !== null) {
        getAllPages(data.next,processResults);
      }
    }
  };

  useEffect(() => {
    getAllPages('/people',(people) => setPeople((prevState => [...prevState,...people])));
  },[]);

  const computeId = (person: Person): string => {
    const extractedId = person.url.match(/\d+/);
    return extractedId ? extractedId.toString() : "";
  };

  return <div>
    <StyledList>
      {people.map((person, index) => (<div className="list-item" key={index}>{index+1}. {person.name}</div>))}
    </StyledList>
    </div>;
};

export { PersonList };
