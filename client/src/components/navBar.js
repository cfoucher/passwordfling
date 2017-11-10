import React from 'react';
import { Link } from 'react-router-dom';
import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';


const NavBar = () => (
  <Appbar className='mui--z2'>
    <Container fluid className='mui--appbar-height'>
      <Row className='mui--appbar-height'>
        <Col
          xs='12'
          sm='8'
          sm-offset='2'
          className='mui--appbar-height mui--text-center center-vertically'
        >
          <Link to={'/'}>
            <div className='mui--text-display3'> Password Fling </div>
          </Link>
        </Col>
      </Row>
    </Container>
  </Appbar>
);

export default NavBar;
