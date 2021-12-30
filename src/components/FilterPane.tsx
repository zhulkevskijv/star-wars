import React from 'react';
import { Card, Form } from "react-bootstrap";
import styled from "styled-components";
import { Film, FilterTypes, Specimen } from "types";

const StyledCard = styled(Card)`
  margin: 10px 0;
  
  h4, span{
    color: black;
    display: block;
  }
  
  span{
    margin: 5px 0;
  }
`;

interface FilterPaneProps {
  films: Film[];
  species: Specimen[];
  /* eslint-disable no-unused-vars */
  setFilters: (filters: Partial<FilterTypes>) => void;
}

const FilterPane = ({ films, species, setFilters }:FilterPaneProps) =>{
  return <StyledCard>
    <Card.Body>
      <h4>Filters</h4>
      <span>Films</span>
      <Form.Control as="select" onChange={(event) => setFilters({ film : event.target.value })}>
        <option value={undefined}>All films</option>
        {films.map((film,index) => (<option key={ index } value={film.url}>{film.title}</option>))}
      </Form.Control>
      <span>Species</span>
      <Form.Control as="select" onChange={(event) => setFilters({ specimen: event.target.value })}>
        <option value={undefined}>All species</option>
        {species.map((specimen, index) => (<option key={ index } value={specimen.url}>{specimen.name}</option>))}
      </Form.Control>
    </Card.Body>
  </StyledCard>;
};

export { FilterPane };
