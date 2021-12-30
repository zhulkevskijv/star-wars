import React, { Fragment } from 'react';
import { PersonList } from 'components';
import { ReactComponent as StarWarsLogo } from 'assets/Logo.svg';
import background from 'assets/starbackground.jpg';
import styled, { createGlobalStyle } from "styled-components";

const AppWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(${background});
  background-repeat: repeat;
  padding: 30px 30px 50px;
  
  .logo-container{
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
    color: white;
  }
`;


const StyledStarWarsLogo = styled(StarWarsLogo)`
  fill: #FFC500;
  height: 200px;
`;

const App = () => {
  return (
    <Fragment>
      <GlobalStyles/>
        <AppWrapper>
          <div className="logo-container">
            <StyledStarWarsLogo/>
          </div>
          <div>
            <h1>Character list</h1>
            <PersonList/>
          </div>
        </AppWrapper>
    </Fragment>
  );
};

export default App;
