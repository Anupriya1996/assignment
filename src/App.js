import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  './App.css';
import Piechart from './Components/Piechart';
import Table from './Components/Table';

function App() {
  return (
  
   <BrowserRouter>
    <Switch>
    <Route path="/" exact component={Table}/>
    <Route path="/piechart" exact component={Piechart}/>
    </Switch>
   </BrowserRouter>
  );
}

export default App;
