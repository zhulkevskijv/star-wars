import React, { Fragment } from 'react';
import { PersonList } from 'components/PersonList';
import { ReactComponent as StarWarsLogo } from 'assets/Logo.svg';
import background from 'assets/starbackground.jpg';
import styled, { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(${background});
  background-repeat: repeat;
  padding: 30px 30px 50px;

  @media (max-width: 600px) {
    padding: 10px 15px 30px;
  }

  .logo-container {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const GlobalStyles = createGlobalStyle`
  body, html, #root{
    height: 100%;
    margin: 0;
  }
  
  *{
    font-family: "Roboto",  sans-serif;
  }
`;

const StyledStarWarsLogo = styled(StarWarsLogo)`
  fill: #ffc500;
  height: 200px;
`;

const App = () => {
  return (
    <Fragment>
      <GlobalStyles />
      <AppWrapper>
        <div className="logo-container">
          <StyledStarWarsLogo />
        </div>
        <PersonList />
      </AppWrapper>
    </Fragment>
  );
};

export default App;
