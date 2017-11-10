import React, { Component } from 'react';
import Row from 'muicss/lib/react/row';
import Button from 'muicss/lib/react/button';

class ScanComplete extends Component {
  handleButtonClick = () => {
    this.props.navigate('/');
  }

  render() {
    return (
      <div className='scan-complete'>
        <Row>
          <div className='mui--text-headline'>
            Your password is now available for decryption on the Receiver
          </div>
        </Row>
        <Row>
          <Button color='primary' onClick={this.handleButtonClick}>Home</Button>
        </Row>
      </div>
    );
  }
}

export default ScanComplete;
