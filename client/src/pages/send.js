import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import NavBar from '../components/navBar';
import PasswordEncryptForm from '../components/passwordEncryptForm';
import QRReader from '../components/qrReader';
import ScanComplete from '../components/scanComplete';

const Send = (props) => {
  let view = (<PasswordEncryptForm
    handleFormChange={props.handleFormChange}
    handleFormSubmit={props.handleFormSubmit}
    password={props.password}
    encryptionKey={props.encryptionKey}
  />);

  if (props.view === 'scanner') {
    view = (
      <QRReader
        password={props.password}
        encryptionKey={props.encryptionKey}
        handleQRScan={props.handleQRScan}
        navigate={props.navigate}
      />
    );
  } else if (props.view === 'complete') {
    view = <ScanComplete navigate={props.navigate} />;
  }
  return (
    <div>
      <NavBar />
      <Container fluid className='mui--align-middle mui--text-center send'>
        <Row className='instructions'>
          <Col xs='12' sm='10' sm-offset='1' md='8' md-offset='2'>
            <div className='mui--text-display1'>{props.instruction}</div>
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

export default Send;
