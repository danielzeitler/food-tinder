import React, { Component } from "react";
import LandingPage from "./LandingPage";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FoodswipeApp from "./FoodswipeApp";
import FoodSwipeProfile from "./FoodswipeProfile";
import auth from "../service/Auth";
import session from "../service/Session";
import apiService from "../service/apiService";
import RestaurantDetail from "./RestaurantDetail";
import PrivateRoute from "../components/PrivateRoute";
import "../css/ReactToastify.css";
import theme from "../components/theme/theme";

const StyledPage = styled.div`
  color: ${props => props.theme.baseColor};
`;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  hr {
    background-color: #e8e8e8;
    border-width: 0px;
    height: 1px;
    margin: 0;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 2.5rem;
    line-height: 2;
    font-family: sans-serif;
    background: ${theme.backgroundApp}
  }

  a {
    text-decoration: none;
    color: ${theme.baseColor}
  }
`;

class RenderPage extends Component {
  constructor() {
    super();
    const token = session.get("token");
    apiService.checkToken(token).then(data => {
      auth.authenticate(data.user, data.token, () => {
        this.setState({ dirty: true });
      });
    });
  }

  state = {
    dirty: false
  };

  render() {
    return auth.isAuthenticated ? (
      // render the full app
      <div>
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <StyledPage>
            <GlobalStyle />
            <BrowserRouter>
              <div>
                <PrivateRoute
                  path="/app/profile"
                  component={FoodSwipeProfile}
                />
                <PrivateRoute path="/app/detail" component={RestaurantDetail} />
                <PrivateRoute path="/" exact component={FoodswipeApp} />
              </div>
            </BrowserRouter>
          </StyledPage>
        </ThemeProvider>
      </div>
    ) : (
      // render the landing page
      <div>
        <ThemeProvider theme={theme}>
          <StyledPage>
            <GlobalStyle />
            <LandingPage />
          </StyledPage>
        </ThemeProvider>
      </div>
    );
  }
}

export default RenderPage;
