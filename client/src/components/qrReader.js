import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

class QRReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result: 'No QR Code Detected',
      facingMode: 'environment',
      showViewFinder: true,
      legacyMode: false,
    };
  }

  componentDidMount() {
    if (!this.props.password || !this.props.encryptionKey) {
      this.props.navigate('/');
    }
  }

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: 'QR Code Captured!',
      });
      this.props.handleQRScan(data);
    }
  }

  handleCameraSelect = (camera) => {
    if (camera) {
      this.setState({
        facingMode: camera,
      });
    }
  }

  handleError = (error) => {
    console.log(error); // eslint-disable-line no-console
  }

  render() {
    return (
      <div className='scanner'>
        <Row className='view-finder'>
          <QrReader
            delay={this.state.delay}
            facingMode={this.state.facingMode}
            onError={this.handleError}
            onScan={this.handleScan}
            showViewFinder={this.state.showViewFinder}
          />
        </Row>
        <Row className='options'>
          <Col sm='6'>
            <Dropdown
              color='primary'
              label='Select Camera'
              alignMenu='left'
              onSelect={this.handleCameraSelect}
              className='camera-select'
            >
              <DropdownItem value='environment'>Environment</DropdownItem>
              <DropdownItem value='user'>User</DropdownItem>
            </Dropdown>
          </Col>
          <Col sm='6' offset='6' className='result'>
            {this.state.result}
          </Col>
        </Row>
      </div>
    );
  }
}

export default QRReader;
