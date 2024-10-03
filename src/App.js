import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import Stock from "./pages/Stock";
import Transaction from "./pages/Transaction"; 
import Command from "./pages/Command";
import Reset_password from "./pages/Reset_password";
import New_password from "./pages/New_password";
import Menu from "./pages/Menu";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import 'react-multi-carousel/lib/styles.css';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Category from "./pages/Category";
import Product from "./pages/Product";
import Order from "./pages/Order";
import { jwtDecode } from "jwt-decode"; // jwtDecode was being imported incorrectly
import { useState, useEffect } from "react";

// Configuration d'Apollo Client
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql', // Lien backend GraphQL
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const history = useHistory();
  const [decodedToken, setDecodedToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        setIsAuthenticated(!!token); // Only check once and set the state
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Switch>
          {/* Routes accessibles sans authentification */}
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route exact path="/new_password" component={New_password} />
          <Route exact path="/reset_password" component={Reset_password} />

          {!decodedToken?.roles?.includes("Serveur") ? (
            <Main>  
              <Route exact path="/dashboard">
                {isAuthenticated ? <Home /> : <Redirect to="/sign-in" />}
              </Route> 
              <Route exact path="/tables">
                {isAuthenticated ? <Tables /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/order">
                {isAuthenticated ? <Order /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/category">
                {isAuthenticated ? <Category /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/product">
                {isAuthenticated ? <Product /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/billing">
                {isAuthenticated ? <Billing /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/rtl">
                {isAuthenticated ? <Rtl /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/profile">
                {isAuthenticated ? <Profile /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/transaction">
                {isAuthenticated ? <Transaction /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/stock">
                {isAuthenticated ? <Stock /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/menu">
                {isAuthenticated ? <Menu /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/command">
                {isAuthenticated ? <Command /> : <Redirect to="/sign-in" />}
              </Route>
            </Main>
          ) : (
            <Main>  
              <Route exact path="/dashboard">
                {isAuthenticated ? <Home /> : <Redirect to="/sign-in" />}
              </Route> 
              <Route exact path="/tables">
                {isAuthenticated ? <Tables /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/order">
                {isAuthenticated ? <Order /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/rtl">
                {isAuthenticated ? <Rtl /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/profile">
                {isAuthenticated ? <Profile /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/stock">
                {isAuthenticated ? <Stock /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/menu">
                {isAuthenticated ? <Menu /> : <Redirect to="/sign-in" />}
              </Route>
            </Main>
          )}

          {/* Redirection par défaut */}
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
