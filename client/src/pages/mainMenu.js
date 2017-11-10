import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';

import NavBar from '../components/navBar';
import ActionPanel from '../components/actionPanel';

const MainMenu = () => (
  <div>
    <NavBar />
    <Container fluid className='mui--text-center main-menu'>
      <Row>
        <ActionPanel
          type='receive'
          offset
        />
        <ActionPanel
          type='send'
        />
      </Row>
    </Container>
  </div>
);

export default MainMenu;
