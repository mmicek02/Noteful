import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError';
import ApiContext from '../ApiContext';

class AddFolder extends Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            }
        }
    }
    updateName(name) {
        this.setState({
            name: {
                value: name,
                touched: true
            }
        });
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const { name } = e.target.value
        const folder = {
          name: name.value,
        }
        const url = 'http://localhost:9090/folders';
        const options = {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
              'content-type': 'application/json',
            }
        };

        fetch(url, options)

      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then(data => {
        name.value = ''
        console.log(name.value);
        this.context.handleAdd(data);
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });

    }
    validateName() {
      console.log(this.state.name);
      console.log(this.state.name.value);
      console.log(this.state.name.value.trim());  
      const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
        }
      }
  render() {
    const nameError = this.validateName();
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input 
              type='text' 
              id='folder-name-input' 
              name='folder-name' 
              onChange={e => this.updateName(e.target.value)}/>
              {this.state.name.touched && <ValidationError message={nameError} />}
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
AddFolder.propTypes = {
  value: PropTypes.string.isRequired
};

export default AddFolder;


