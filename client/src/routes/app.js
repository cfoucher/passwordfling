import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import MainMenu from '../pages/mainMenu';
import SendRoutes from './sendRoutes';
import ReceiveRoutes from './receiveRoutes';

const App = () => (
  <div>
    <Switch>
      <Route exact path='/' component={MainMenu} />
      <Route path='/send' component={SendRoutes} />
      <Route path='/receive' component={ReceiveRoutes} />
    </Switch>
  </div>
);

export default App;
