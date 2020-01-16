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
        const url = 'http://localhost:9090/folders';
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
      console.log(this.state.folderName);
      console.log(this.state.folderName.value);
      console.log(this.state.folderName.value.trim());  
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
            <button type='submit' onClick={e => this.handleSubmit(e)}>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

export default AddFolder;

AddFolder.propTypes = {
  folderName: (props, propName, componentName) => {
    // get the value of the prop
    const prop = props.propName;

    // do the isRequired check
    if(!prop) {
      return new Error(`${propName} is required in ${componentName}. Validation Failed`);
    }

    // check the type
    if (typeof prop != 'string') {
      return new Error(`Invalid prop, ${propName} is expected to be a string in ${componentName}. ${typeof prop} found.`);
    }

    // do the custom check here
    // using a simple regex
    if (prop.length < 3 ) {
      return new Error(`Invalid prop, ${propName} must be min length 5 and begin http(s)://. Validation Failed.`);
    }
  },
}