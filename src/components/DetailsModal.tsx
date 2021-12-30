import React, { Fragment } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Film, Person, Specimen, Starship } from "types";
import styled from "styled-components";
import { getPropertiesById } from "utils/utils";

interface DetailsModalProps {
  show: boolean;
  selectedPerson: Person | null;
  handleClose: () => void;
  species: Array<Specimen>;
  films: Array<Film>;
  starships: Array<Starship>;
}

const InfoText = styled.p`
  color: black;
  margin: 10px 0;
`;

const DetailsModal = ({ show, handleClose, selectedPerson, films, species, starships }: DetailsModalProps) =>{
  return <Modal
    show={show}
    onHide={handleClose}
    centered
  >
    {selectedPerson
      ?
      <Modal.Header closeButton/>
      :
      <Fragment/>
    }
    <Modal.Body>
      {selectedPerson ?
        <Fragment>
          <InfoText>Name: {selectedPerson.name}</InfoText>
          <InfoText>Species: {selectedPerson.species.length > 0? getPropertiesById("name",selectedPerson.species, species).join(", "): "Not defined"}</InfoText>
          <InfoText>Films: {selectedPerson.films.length > 0? getPropertiesById("title",selectedPerson.films, films).join(", "): "Not defined"}</InfoText>
          <InfoText>Spaceships: {selectedPerson.starships.length > 0? getPropertiesById("name",selectedPerson.starships, starships).join(", "): "Not defined"}</InfoText>
        </Fragment> : <p>No information</p>
      }
    </Modal.Body>
    <Modal.Footer>
      <Button variant="success">Add to Favorites</Button>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>;
};

export { DetailsModal };
