import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';

class AddNote extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      modified: '',
      folderId: '',
      content: '',
      touched: false,
    }
  }

  updateNoteContent = (noteContent) =>{
    this.setState({
      content: noteContent
    })
  }
  updateNoteTitle = (noteTitle) =>{
    this.setState({
      name: noteTitle,
      touched: true
    })
  }
  updateFolderId = (folderId) =>{
    this.setState({
      folderId: folderId
    })
  }
  
  handleSubmit = e => {
    e.preventDefault();

    const noteInfo = {
      name: this.state.name,
      folderId: this.state.folderId,
      content: this.state.content,
      modified: new Date,
    }

    const url ='http://localhost:9090/notes'
    const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(noteInfo)
    };

    fetch(url, options)
  
    .then(res => {
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later');
      }
      return res.json();
    })
    .then(resJson => {
      this.context.notes.push(resJson)
      this.props.history.push(`/folder/${noteInfo.folderId}`) 
    })
  }

  validateName() {
    console.log(this.state.name)
    const name = this.state.name;
    if (name.length === 0) {
      return 'Name is required';
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
  }

  render() {
    const nameError = this.validateName();
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input 
              type='text' 
              id='note-name-input' 
              placeholder="Note title" 
              name='note-name' 
              onChange={e => this.updateNoteTitle(e.target.value)}/>
              {this.state.name.touched && <ValidationError message={nameError} />}
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <input 
              id='note-content-input' 
              name='note-content' 
              placeholder="Add content" 
              onChange={e => this.updateNoteContent(e.target.value)}/>
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id' onChange={e => this.updateFolderId(e.target.value)}>
              <option value="">Select folder</option>
                {this.context.folders.map(folderName =>
                  <option key={folderName.id} value={folderName.id}>{folderName.name}</option>
                )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit' onClick={e => this.handleSubmit(e)}>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

export default AddNote;
