import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import HomePage from './HomePage';
import './style.css';

function App() {
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() => (
          <>
          <Container style={{marginTop: '7em'}}> 
          </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
