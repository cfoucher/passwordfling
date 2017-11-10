import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import CryptoJS from 'crypto-js';
import { ToastContainer, toast } from 'react-toastify';
import copy from 'copy-to-clipboard';

class PasswordDecryptForm extends Component {
  constructor(props) {
    super(props);
    this.state = { decryptedAndCopied: false };
  }

  componentDidMount() {
    if (!this.props.hash) {
      this.props.navigate('/');
    }
  }

  handleFormChange = (event) => {
    this.setState({ [event.target.getAttribute('data-state-value')]: event.target.value });
  }

  handleDecryptAndCopy = (event) => {
    const decrypted = CryptoJS.AES.decrypt(this.props.hash, `${this.state.decryption_key}${this.props.qrCodeID}`);
    const decryptedPassword = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedPassword) {
      toast('Could not Decrypt password. Please check your Decryption Key', { type: 'error' });
    } else {
      copy(decryptedPassword);
      this.setState({ decryptedAndCopied: true });
      toast('Success! Your password has been copied to your Clip Boad', { type: 'success' });
    }
    event.preventDefault();
  }

  render() {
    let buttons = (
      <Button color='primary' onClick={this.handleDecryptAndCopy}>
        Decrypt and Copy to Clip Board
      </Button>
    );
    if (this.state.decryptedAndCopied) {
      buttons = (
        <div>
          <Button color='accent' onClick={() => { this.props.navigate('/'); }}>Home</Button>
          <Button color='primary' onClick={this.handleDecryptAndCopy}>Copy Again</Button>
        </div>
      );
    }
    return (
      <div>
        <div className='decryption-form'>
          <Form>
            <Input
              className='mui--text-left'
              hint='<My Encrypted Password>'
              label='Encrypted Password'
              onChange={this.handleFormChange}
              required
              type='password'
              readOnly
              value={this.props.hash}
            />
            <Input
              className='mui--text-left'
              data-state-value='decryption_key'
              hint='<My Super Secret Decryption Key>'
              label='Decryption Key'
              onChange={this.handleFormChange}
              required
              type='password'
            />
            {buttons}
          </Form>
        </div>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </div>
    );
  }
}

export default PasswordDecryptForm;
