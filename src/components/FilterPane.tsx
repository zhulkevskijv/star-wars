import React from 'react';
import { Card, FormSelect } from "react-bootstrap";
import styled from "styled-components";
import { Film, Specimen } from "types";

const StyledCard = styled(Card)`
  margin: 10px 0;
  
  h4, span{
    color: black;
  }
`;

interface FilterPaneProps {
  films: Film[];
  species: Specimen[];
}

const FilterPane = ({ films, species }:FilterPaneProps) =>{
  return <StyledCard>
    <Card.Body>
      <h4>Filters</h4>
      <span>Films</span>
      <FormSelect>
        {films.map((film,index) => (<option key={ index }>{film.title}</option>))}
      </FormSelect>
      <span>Species</span>
      <FormSelect>
        {species.map((specimen, index) => (<option key={ index }>{specimen.name}</option>))}
      </FormSelect>
    </Card.Body>
  </StyledCard>;
};

export { FilterPane };
