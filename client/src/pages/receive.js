import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import NavBar from '../components/navBar';
import QRImage from '../components/qrImage';
import PasswordDecryptForm from '../components/passwordDecryptForm';

const Receive = (props) => {
  let view = <QRImage onHashReceived={props.onHashReceived} qrCodeID={props.qrCodeID} />;

  if (props.view === 'decrypt') {
    view = <PasswordDecryptForm qrCodeID={props.qrCodeID} hash={props.hash} navigate={props.navigate} />;
  }

  return (
    <div>
      <NavBar />
      <Container fluid className='mui--align-middle mui--text-center receive'>
        <Row className='instructions'>
          <Col xs='12' sm='10' sm-offset='1' md='8' md-offset='2'>
            {<div className='mui--text-display1'>{props.instruction}</div>}
          </Col>
        </Row>
        <Row>
          <Col xs='12' sm='10' sm-offset='1' md='8' md-offset='2' lg='6' lg-offset='3'>
            {view}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Receive;
