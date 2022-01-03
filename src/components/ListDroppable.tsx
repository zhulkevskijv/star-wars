import React, { Fragment } from 'react';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { computeId } from "utils/utils";
import { Person } from "types";
import styled from "styled-components";
import loader from 'assets/space-loading.gif';

const StyledList = styled.div`
  width: 50%;
  padding: 0 20px;
  height: 100%;
  
  @media (max-width: 600px){
    padding: 0 10px;
  }
  & > div {
    height: auto;
  }
  .list-item{
    padding: 10px;
    border-bottom: 1px grey solid;
    cursor: pointer;
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

interface ListDroppableTypes{
  droppableId: string;
  data: Array<Person>;
  title: string;
  /* eslint-disable no-unused-vars */
  handleShow: (person: Person) => void;
  isLoaderIncluded?: boolean;
  isLoading?: boolean;
}

const ListDroppable = ({ droppableId, data, handleShow, title, isLoading = false, isLoaderIncluded = false }:ListDroppableTypes) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <StyledList>
          <h1>{title}</h1>
          <div
            ref={provided.innerRef}>
            {data.map((person, index) => (
              <Draggable
                key={index}
                draggableId={"-"+computeId(person.url)}
                index={index}>
                {(provided) => (
                  <div className="list-item"
                       key={index}
                       onClick={ ()=> handleShow(person) }
                       ref={provided.innerRef}
                       {...provided.draggableProps}
                       {...provided.dragHandleProps}
                       style={
                         provided.draggableProps.style
                       }
                  >
                    {computeId(person.url)}. {person.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
          {isLoading && isLoaderIncluded ? <LoaderContainer>
            <img className="loader" src={loader} alt="Still Loading..."/>
            <h3 className="loader-message">Loading...</h3>
          </LoaderContainer> : <Fragment/>
          }
        </StyledList>
      )}
    </Droppable>
  );
};

export { ListDroppable };