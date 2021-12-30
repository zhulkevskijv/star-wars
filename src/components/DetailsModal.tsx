import React, { Fragment } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Person } from "types";
import styled from "styled-components";

interface DetailsModalProps {
  show: boolean;
  selectedPerson: Person | null;
  handleClose: () => void;
}

const InfoText = styled.p`
  color: black;
  margin: 10px 0;
`;

const DetailsModal = ({ show, handleClose, selectedPerson }: DetailsModalProps) =>{
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
