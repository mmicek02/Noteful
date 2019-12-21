import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import PropTypes from 'prop-types';

class AddNote extends Component {
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
handleSubmit(event) {
    event.preventDefault();
    const {name} = this.state;
    console.log('Name: ', name.value);
    const url ='http://localhost:9090/notes'
    const options = {
        method: 'POST',
        body: JSON.stringify(name),
        headers: {
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
    this.props.handleAdd(name);
  })
  .catch(err => {
    this.setState({
      error: err.message
    });
  });
}
validateName() {
    console.log(this.state.name)
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
  }


  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name' />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

export default AddNote;

AddNote.propTypes = {
  value: PropTypes.string.isRequired
};
