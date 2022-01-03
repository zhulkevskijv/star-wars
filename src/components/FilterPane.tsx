import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Film, FilterTypes, Specimen } from 'types';

const StyledCard = styled(Card)`
  margin: 10px 0;

  h4,
  span {
    color: black;
    display: block;
  }

  span {
    margin: 5px 0;
  }
`;

interface FilterPaneProps {
  films: Film[];
  species: Specimen[];
  /* eslint-disable no-unused-vars */
  setFilters: (filters: Partial<FilterTypes>) => void;
  filters: FilterTypes;
}

const FilterPane = ({
  films,
  species,
  setFilters,
  filters,
}: FilterPaneProps) => {
  const [birthFrom, setBirthFrom] = useState(Math.abs(filters.birthYearFrom));
  const [birthTo, setBirthTo] = useState(Math.abs(filters.birthYearTo));
  const [birthFromEra, setBirthFromEra] = useState(
    filters.birthYearFrom < 0 ? 'BBY' : 'ABY'
  );
  const [birthToEra, setBirthToEra] = useState(
    filters.birthYearTo < 0 ? 'BBY' : 'ABY'
  );

  useEffect(() => {
    setFilters({
      birthYearFrom: birthFromEra === 'BBY' ? -1 * birthFrom : birthFrom,
    });
  }, [birthFrom, birthFromEra]);

  useEffect(() => {
    setFilters({ birthYearTo: birthToEra === 'BBY' ? -1 * birthTo : birthTo });
  }, [birthTo, birthToEra]);

  return (
    <StyledCard>
      <Card.Body>
        <h4>Filters</h4>
        <span>Films</span>
        <Form.Control
          as="select"
          onChange={(event) => setFilters({ film: event.target.value })}
        >
          <option value={undefined}>All films</option>
          {films.map((film, index) => (
            <option key={index} value={film.url}>
              {film.title}
            </option>
          ))}
        </Form.Control>
        <span>Species</span>
        <Form.Control
          as="select"
          onChange={(event) => setFilters({ specimen: event.target.value })}
        >
          <option value={undefined}>All species</option>
          {species.map((specimen, index) => (
            <option key={index} value={specimen.url}>
              {specimen.name}
            </option>
          ))}
        </Form.Control>
        <span>Birth year from</span>
        <Row className="g-2">
          <Col md={8}>
            <Form.Control
              as="select"
              onChange={(event) => setBirthFrom(+event.target.value)}
            >
              {[...Array(1000).keys()]
                .sort((a: number, b: number) => b - a)
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </Form.Control>
          </Col>
          <Col md={4}>
            <Form.Control
              as="select"
              onChange={(event) => setBirthFromEra(event.target.value)}
            >
              <option value={'BBY'}>BBY</option>
              <option value={'ABY'}>ABY</option>
            </Form.Control>
          </Col>
        </Row>
        <span>Birth year to</span>
        <Row className="g-2">
          <Col md={8}>
            <Form.Control
              as="select"
              onChange={(event) => setBirthTo(+event.target.value)}
            >
              {[...Array(1000).keys()]
                .sort((a: number, b: number) => b - a)
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </Form.Control>
          </Col>
          <Col md={4}>
            <Form.Control
              as="select"
              onChange={(event) => setBirthToEra(event.target.value)}
            >
              <option value={'ABY'}>ABY</option>
              <option value={'BBY'}>BBY</option>
            </Form.Control>
          </Col>
        </Row>
      </Card.Body>
    </StyledCard>
  );
};

export { FilterPane };
