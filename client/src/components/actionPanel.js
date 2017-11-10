import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Panel from 'muicss/lib/react/panel';

import upload from '../images/upload.svg';
import download from '../images/download.svg';


const ActionPanel = (props) => {
  const images = { receive: download, send: upload };
  return (
    <Col
      className='action-panel'
      {...props.offset ? {
        'sm': '6', 'md': '4', 'lg': '3', 'md-offset': '2', 'lg-offset': '3',
      } : { sm: 6, md: 4, lg: 3 }}
    >
      <Link to={`/${props.type}`}>
        <Panel>
          <Row className='mui--text-center'>
            <img src={images[props.type]} alt='download' />
          </Row>
          <Row className='mui--text-headline'>
            {props.type.charAt(0).toUpperCase() + props.type.slice(1)} Password
          </Row>
        </Panel>
      </Link>
    </Col>
  );
};

export default ActionPanel;
