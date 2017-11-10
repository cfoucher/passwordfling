import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';


class PasswordEncryptForm extends Component {
  handleFormChange = (event) => {
    this.props.handleFormChange(event.target);
  }

  handleFormSubmit = (event) => {
    if (this.props.password && this.props.encryptionKey) {
      this.props.handleFormSubmit(event.target);
    } else {
      alert('Both a "Password" and an "Encryption Key" are required'); // eslint-disable-line no-alert
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className='encryption-form'>
        <Form>
          <Input
            className='mui--text-left'
            data-state-value='password'
            hint='<My Password>'
            label='Password'
            onChange={this.handleFormChange}
            required
            type='password'
            value={this.props.password}
          />
          <Input
            className='mui--text-left'
            data-state-value='encryptionKey'
            hint='<My Super Secret Encryption Key>'
            label='Encryption Key'
            onChange={this.handleFormChange}
            required
            type='password'
            value={this.props.encryptionKey}
          />
          <Button color='primary' onClick={this.handleFormSubmit}>Continue</Button>
        </Form>
      </div>
    );
  }
}

export default PasswordEncryptForm;
