import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import Row from 'muicss/lib/react/row';
import Button from 'muicss/lib/react/button';
import Client from '../client';

class QRImage extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, maxCount: 60 };
  }

  componentDidMount() {
    this.startPolling();
  }

  componentWillUnmount() {
    clearInterval(this.state.checkInvervalId);
  }

  checkIfScanned = () => {
    const newCount = this.state.count + 1;
    Client.retrieve(this.props.qrCodeID, (response) => {
      if (response.success) {
        this.props.onHashReceived(response.data);
      } else {
        console.log(response.error); // eslint-disable-line no-console
      }
    });
    if (newCount >= this.state.maxCount) {
      clearInterval(this.state.checkInvervalId);
    }
    this.setState({ count: newCount });
  }

  startPolling = () => {
    const checkInvervalId = setInterval(this.checkIfScanned, 1000);
    this.setState({ checkInvervalId, count: 0 });
  }

  render() {
    let retrieveStatus = (
      <div className='mui--text-headline'>
        Waiting for Scan to Occur
        <span className='spinner' />
      </div>
    );
    if (this.state.count >= this.state.maxCount) {
      retrieveStatus = (
        <div className='mui--text-headline'>
          Timed Out. Click to try again
          <Button color='primary' onClick={() => this.startPolling()}>Retry</Button>
        </div>
      );
    }

    return (
      <div className='qr-code'>
        <Row className='mui--text-headline mui--text-center title'>
          {retrieveStatus}
        </Row>
        <Row className='mui--text-headline mui--text-center qr-image'>
          <QRCode value={this.props.qrCodeID} size={512} />
        </Row>
      </div>
    );
  }
}

export default QRImage;
