import React, { Fragment, useEffect, useState } from 'react';
import swapi from 'config/axios';
import { Person, SWAPIResult, Film, Specimen, FilterTypes, Starship } from 'types';
import { AxiosResponse } from 'axios';
import styled from 'styled-components';
import loader from 'assets/space-loading.gif';
import { DetailsModal } from "components/DetailsModal";
import { FilterPane } from "components/FilterPane";
import { comparePeople, computeId, computeYear } from "utils/utils";
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "react-beautiful-dnd";


const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledList = styled.div`
  width: 50%;
  padding: 0 20px;
  .list-item{
    padding: 10px;
    border-bottom: 1px grey solid;
    cursor: pointer;
    &:nth-child(2){
      border-top: 1px grey solid;
    }
  }
`;

const FavoriteList = styled(StyledList)`
  height: auto;
  & > div {
    height: 100%;
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
  const [filteredPeople, setFilteredPeople] = useState<Array<Person>>([]);
  const [favorites, setFavorites] = useState<Array<Person>>([]);
  const [films, setFilms] = useState<Array<Film>>([]);
  const [species, setSpecies] = useState<Array<Specimen>>([]);
  const [starships, setStarships] = useState<Array<Starship>>([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [filters, setFilters] = useState<FilterTypes>({ film: null, specimen: null, birthYearFrom: -999, birthYearTo: 999 });

  const handleClose = () => {
    setShow(false);
    setSelectedPerson(null);
  };
  const handleShow = (person: Person) => {
    setSelectedPerson(person);
    setShow(true);
  };


  const getPage = <Type,>(url:string) :Promise<SWAPIResult<Type> | void> => swapi.get(url)
    .then((response:AxiosResponse<SWAPIResult<Type>>) => Promise.resolve(response.data))
    .catch(error => console.log("Problem occurred during fetching!", error));

  /* eslint-disable no-unused-vars */
  const getAllPages  = async <Type,>(url : string, processResults : (results:Array<Type>) => void) => {
    const data = await getPage<Type>(url);
    if (data){
      processResults(data.results);
      if (data.next !== null) {
        await getAllPages(data.next,processResults);
      }
    }
  };

  useEffect(() => {
    const favs = window.localStorage.getItem('favorites');
    if (favs)
      setFavorites(JSON.parse(favs));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    setIsLoading(true);
    getAllPages('/people',(people : Person[]) => setPeople(prevState => [...prevState,...people]))
      .finally(() => setIsLoading(false));
    getAllPages('/films',(films : Film[]) => setFilms(prevState => [...prevState,...films]));
    getAllPages('/species',(species : Specimen[]) => setSpecies(prevState => [...prevState,...species]));
    getAllPages('/starships',(starships : Specimen[]) => setStarships(prevState => [...prevState,...starships]));
  },[]);

  useEffect(() => {
    setFilteredPeople(people);
    if (filters.film){
      const filmId = computeId(filters.film);
      setFilteredPeople((prevPeople) => prevPeople.filter(pers => pers.films.some(film => film.includes(filmId))));
    }
    if (filters.specimen) {
      const specimenId = computeId(filters.specimen);
      setFilteredPeople((prevPeople) => prevPeople.filter(pers => pers.species.some(specimen => specimen.includes(specimenId))));
    }
    if (filters.birthYearTo) {
      setFilteredPeople(prevPeople => prevPeople.filter(person => computeYear(person.birth_year) <= filters.birthYearTo));
    }
    if (filters.birthYearFrom) {
      setFilteredPeople(prevPeople => prevPeople.filter(person => computeYear(person.birth_year) >= filters.birthYearFrom));
    }
  },[filters, people]);

  const addToFavorites = (person : Person) => {
    if (!favorites.some(fav => person.url === fav.url)){
      setFavorites(prevFavs => [...prevFavs, person].sort(comparePeople));
    }
  };

  const removeFromFavorites = (index : number) => {
    setFavorites((prevFavs => prevFavs.filter((_, idx) => idx !== index)));
  };

  const onDragEnd : OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (source.droppableId === "droppable2" && (!destination || (destination?.droppableId === "droppable"))) {
      removeFromFavorites(source.index);
    }

    if ((source.droppableId === 'droppable') && (destination?.droppableId === 'droppable2')) {
      addToFavorites(filteredPeople[source.index]);
    }
  };

  return <div>
    <FilterPane films={films} species={species} filters={filters} setFilters={(newFilters) => setFilters({ ...filters, ...newFilters })}/>
    <ListContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <StyledList>
              <h1>Character list</h1>
              <div
                ref={provided.innerRef}>
                {filteredPeople.map((person, index) => (
                  <Draggable
                    key={index}
                    draggableId={computeId(person.url)}
                    index={index}>
                    {(provided, snapshot) => (
                        <div className="list-item"
                             key={index}
                             onClick={ ()=> handleShow(person) }
                             ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}
                             style={
                               provided.draggableProps.style
                             }>{computeId(person.url)}. {person.name}
                        </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
              {isLoading ? <LoaderContainer>
                <img className="loader" src={loader} alt="Still Loading..."/>
                <h3 className="loader-message">Loading...</h3>
              </LoaderContainer> : <Fragment/>
              }
            </StyledList>
          )}
          </Droppable>
        <Droppable droppableId="droppable2">
          {(provided, snapshot) => (
            <FavoriteList>
              <h1>Favorites</h1>
              <div
                ref={provided.innerRef}>
                {favorites.map((person, index) => (
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
            </FavoriteList>
          )}
          </Droppable>
      </DragDropContext>
    </ListContainer>

    <DetailsModal show={show} selectedPerson={selectedPerson} handleClose={handleClose} films={films} species={species} starships={starships} addToFavorites={addToFavorites}/>
  </div>;
};

export { PersonList };
