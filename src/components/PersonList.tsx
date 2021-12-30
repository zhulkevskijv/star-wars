import React, { Fragment, useEffect, useState } from 'react';
import swapi from 'config/axios';
import { Person, SWAPIPersonResult } from 'types';
import { AxiosResponse } from 'axios';
import styled from 'styled-components';
import loader from 'assets/space-loading.gif';

const StyledList = styled.div`
  .list-item{
    padding: 10px;
    border-bottom: 1px grey solid;
    &:first-child{
      border-top: 1px grey solid;
    }
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .loader{
    height: 100px;
  }
  .loader-message{
    margin-top: -10px;
  }
`;

const PersonList = () => {
  const [people, setPeople] = useState<Array<Person>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getPage = (url:string) :Promise<SWAPIPersonResult | void> => swapi.get(url)
    .then((response:AxiosResponse<SWAPIPersonResult>) => Promise.resolve(response.data))
    .catch(error => console.log("Problem occurred during fetching!", error));

  /* eslint-disable no-unused-vars */
  const getAllPages  = async (url : string, processResults : (people:Array<Person>) => void) => {
    const data = await getPage(url);
    if (data){
      processResults(data.results);
      if (data.next !== null) {
        await getAllPages(data.next,processResults);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(()=>getAllPages('/people',(people) => setPeople((prevState => [...prevState,...people])))
      .finally(() => setIsLoading(false)),1000);
  },[]);

  const computeId = (person: Person): string => {
    const extractedId = person.url.match(/\d+/);
    return extractedId ? extractedId.toString() : "";
  };

  return <div>
    <StyledList>
      {people.map((person, index) => (<div className="list-item" key={index}>{index+1}. {person.name}</div>))}
      {isLoading? <LoaderContainer>
          <img className="loader" src={loader} alt="Still Loading..."/>
          <h3 className="loader-message">Loading...</h3>
        </LoaderContainer> : <Fragment/>
      }
    </StyledList>
  </div>;
};

export { PersonList };
