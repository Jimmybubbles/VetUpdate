import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context"

import Header from "./components/header"
import Footer from "./components/Footer"




const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authenticated token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httplink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<landingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/User" element={<User />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </ApolloProvider>
  )
}

