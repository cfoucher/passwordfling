import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import Send from '../pages/send';
import Client from '../client';


class SendRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = { password: '', encryptionKey: '' };
  }

  navigate = (route) => {
    this.props.history.push(route);
  }
  handleFormChange = (target) => {
    this.setState({ [target.getAttribute('data-state-value')]: target.value });
  }

  handleFormSubmit = () => {
    this.navigate('/send/scanner');
  }

  handleQRScan = (qrCodeData) => {
    const key = `${this.state.encryptionKey}${qrCodeData}`;
    const encrypted = CryptoJS.AES.encrypt(this.state.password, key);
    const hash = encrypted.toString();

    Client.save(qrCodeData, hash, (response) => {
      if (response.success) {
        this.navigate('/send/complete');
      } else {
        console.log(response.error); // eslint-disable-line no-console
      }
    });
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path='/send'
          render={() =>
            (<Send
              encryptionKey={this.state.encryptionKey}
              handleFormChange={this.handleFormChange}
              handleFormSubmit={this.handleFormSubmit}
              handleQRRead={this.handleQRRead}
              handleQRScan={this.handleQRScan}
              instruction='Enter your Password, and a unique Key to encrypt it'
              navigate={this.navigate}
              password={this.state.password}
              view='form'
            />)
          }
        />
        <Route
          path='/send/scanner'
          render={() =>
            (<Send
              encryptionKey={this.state.encryptionKey}
              handleFormChange={this.handleFormChange}
              handleFormSubmit={this.handleFormSubmit}
              handleQRRead={this.handleQRRead}
              handleQRScan={this.handleQRScan}
              instruction='Scan the QR code from the Receiver'
              navigate={this.navigate}
              password={this.state.password}
              view='scanner'
            />)
          }
        />
        <Route
          path='/send/complete'
          render={() =>
            (<Send
              encryptionKey={this.state.encryptionKey}
              handleFormChange={this.handleFormChange}
              handleFormSubmit={this.handleFormSubmit}
              handleQRRead={this.handleQRRead}
              handleQRScan={this.handleQRScan}
              instruction='Success!'
              navigate={this.navigate}
              password={this.state.password}
              view='complete'
            />)
          }
        />
      </Switch>
    );
  }
}

export default SendRoutes;
