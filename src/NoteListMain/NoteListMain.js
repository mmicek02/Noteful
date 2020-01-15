import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'
import ErrorBoundary from '../ErrorBoundary'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folderId } = this.props.match.params /*finds the :folder_id in the URL thru match (whos only parametre is the folderid), and makes it a variable for us to use later*/
    const { notes } = this.context 
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>   { /*using the previously filtered note-list, make a new array of notes as decided by the folder_id scraped earlier*/
            console.log(note);
            return (
            <ErrorBoundary key={note.id}>
              <li key={note.id}>
                <Note /*creates the note cards */
                  key={note.id}
                  id={note.id}
                  title={note.name}
                  folder_id={note.folderId}
                  date_modified={note.modified}
                />
              </li>
            </ErrorBoundary>) }
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}
