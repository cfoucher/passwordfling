import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import Receive from '../pages/receive';
// import Client from '../client';

class ReceiveRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = { qrCodeID: CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64), hahs: '' };
  }

  onHashReceived = (hash) => {
    this.setState({
      hash,
    });
    this.navigate('/receive/decrypt');
  }

  navigate = (route) => {
    this.props.history.push(route);
  }
  // let decrypted = CryptoJS.AES.decrypt(hash, key);
  // console.log(decrypted.toString(CryptoJS.enc.Utf8));

  render() {
    return (
      <Switch>
        <Route
          exact
          path='/receive'
          render={() =>
            (<Receive
              qrCodeID={this.state.qrCodeID}
              hash={this.state.hash}
              onHashReceived={this.onHashReceived}
              navigate={this.navigate}
              view='qrcode'
              instruction='Scan the QR Code from the Sender' // eslint-disable-line max-len
            />)
          }
        />
        <Route
          path='/receive/decrypt'
          render={() =>
            (<Receive
              qrCodeID={this.state.qrCodeID}
              hash={this.state.hash}
              onHashReceived={this.onHashReceived}
              navigate={this.navigate}
              view='decrypt'
              instruction='Enter your Secrect Key to Decrypt your Password'
            />)
          }
        />
      </Switch>
    );
  }
}

export default ReceiveRoutes;
