import React, { Fragment } from 'react';
import { PersonList } from 'components';
import { ReactComponent as StarWarsLogo } from 'assets/Logo.svg';
import background from 'assets/starbackground.jpg';
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

const AppWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(${background});
  background-repeat: repeat;
  padding: 30px;
  
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

const mainTheme = {
  primaryColor: "#FFF",
};

const StyledStarWarsLogo = styled(StarWarsLogo)`
  fill: #FFC500;
  height: 200px;
`;

const ContentContainer = styled.div`
  h1{
    color: ${props => props.theme.primaryColor};
  }
`;

const App = () => {
  return (
    <Fragment>
      <GlobalStyles/>
      <ThemeProvider theme={mainTheme}>
        <AppWrapper>
          <div className="logo-container">
            <StyledStarWarsLogo/>
          </div>
          <ContentContainer>
            <h1>Character list</h1>
          </ContentContainer>
          <PersonList/>
        </AppWrapper>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
