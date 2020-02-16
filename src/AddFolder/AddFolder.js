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
            folderName: {
                value: ' ',
                touched: false
            }
        }
    } 

    updateFolderName(folderName) {
        this.setState({
          folderName: {
            value: folderName,
            touched: true
          }
        });
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const folderInfo = {
          name: this.state.folderName.value
        }
        const url = 'https://rocky-falls-33917.herokuapp.com/folders';
        const options = {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(folderInfo),
        };
        fetch(url, options)

    .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
    .then(resJson => {
        this.context.folders.push(resJson) //push into context, since API only updates context on componentDidMount
        this.props.history.push(`/folder/${resJson.id}`)
    })
    .catch(error => {
      alert(error);
      this.props.history.push('/');
    })
}
    validateName() {
      const name = this.state.folderName.value.trim();
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
              onChange={e => this.updateFolderName(e.target.value)}/>
              {this.state.folderName.touched && <ValidationError message={nameError} />}
          </div>
          <div className='buttons'>
            <button 
              type='submit' 
              onClick={e => this.handleSubmit(e)}
              disabled = {
                this.validateName(),
                !!nameError
              }
            >
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

export default AddFolder;

AddFolder.PropTypes = {
  name: PropTypes.string.isRequired,
};