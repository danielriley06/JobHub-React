import React from 'react'
import Post from './Post'
import SearchForm from './SearchForm'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ActionInfo from 'material-ui/svg-icons/action/info'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Spinner from 'react-spinkit'

export const SearchList = (props) => (
  <div style={{ margin: '0 auto' }} >
      <div className='col-xs-12 col-lg-9'>
        <div className='jobsearchlist'>
          <List>
          {props.isEmpty
            ? (props.isFetching ?
              <div className='center'>
                <Spinner spinnerName='three-bounce' noFadeIn />
              </div> :
              <div className='center'>
                <h2>Use the search form to find job posts...</h2>
              </div>
            )
            : <div style={{ opacity: props.isFetching ? 0.5 : 1 }}>
            <Subheader>Current Search Results</Subheader>
            <Divider inset />
            {Object.keys(props.jobs).map(key => {
              return (
                <div>
                  <ListItem
                  disabled
                    key={key}
                    primaryText={props.jobs[key].jobtitle}
                    rightIconButton={
                      <FloatingActionButton
                      style={{ top: '22px' }}
                      mini
                      secondary
                      disabled={props.isSaved(props.jobs[key].jobkey)}
                      onTouchTap={() => props.handleSave(props.jobs[key])}
                      >
                        <ContentAdd />
                      </FloatingActionButton>
                    }

                    secondaryText={
                      <p>
                        <span>{props.jobs[key].company}</span><br />
                        <span>{props.jobs[key].url}</span>
                      </p>
                    }
                    secondaryTextLines={2}
                  />
                  <Divider inset />
                </div>
              )
            })}
              </div>
          }
          </List>
        </div>

      </div>
  </div>
)

export default SearchList
