import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import ErrorBoundary from '../ErrorBoundary'
import './NoteListNav.css'

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder => /*creating all folder navigation elements */
            <ErrorBoundary key={folder.id}>
            <li key={folder.id}> 
              <NavLink /*creates a list of nav links that stay highlighted when last clicked*/
                key={folder.id}
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`} /*sets up the hrefs create the URL based on folder_ids */
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}  
                </span>
                {folder.name}
              </NavLink>
            </li>
            </ErrorBoundary>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
}
