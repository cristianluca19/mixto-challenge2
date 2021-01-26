import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Registro from "./registro/registro.jsx";
import Inicio from "./inicio/inicio.jsx";

import "./App.css";

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Inicio} />
        <Route exact path='/registro' component={Registro} />
      </Switch>
    </div>
  );
}

export default App;
