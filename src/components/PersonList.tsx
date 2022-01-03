import React, { useEffect, useState } from 'react';
import { Person, Film, Specimen, FilterTypes, Starship } from 'types';
import styled from 'styled-components';
import { DetailsModal } from "components/DetailsModal";
import { FilterPane } from "components/FilterPane";
import { comparePeople, computeId, computeYear } from "utils/utils";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import { ListDroppable } from "components/ListDroppable";
import { getAllPages } from "utils/requests";


const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
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

    if (source.droppableId === 'droppable2' && (!destination || (destination?.droppableId === 'droppable'))) {
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
        <ListDroppable title={"All characters"} droppableId={"droppable"} data={filteredPeople} handleShow={handleShow} isLoaderIncluded={true} isLoading={isLoading}/>
        <ListDroppable title={"Favorites"} droppableId={"droppable2"} data={favorites} handleShow={handleShow} style={{ height : "auto" }}/>
      </DragDropContext>
    </ListContainer>

    <DetailsModal show={show} selectedPerson={selectedPerson} handleClose={handleClose} films={films} species={species} starships={starships}/>
  </div>;
};

export { PersonList };
