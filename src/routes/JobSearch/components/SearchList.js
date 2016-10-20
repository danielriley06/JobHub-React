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

export const SearchList = (props) => (
  <div style={{ margin: '0 auto' }} >
    <div className='row'>
      <div className='col-xs-12 col-lg-3'>
        <SearchForm onSubmit={data => { props.fetchPosts(data) }} />
      </div>
      <div className='col-xs-12 col-lg-9'>
        <div className='jobsearchlist'>
          <List>
            <Subheader>Current Search Results</Subheader>
            <Divider inset />
            {Object.keys(props.posts).map(key => {
              return (
                <div>
                  <ListItem
                    key={key}
                    primaryText={props.posts[key].jobtitle}
                    rightIconButton={
                      <FloatingActionButton style={{ top: '22px' }} mini secondary onTouchTap={() => props.savePost(props.posts[key])}>
                        <ContentAdd />
                      </FloatingActionButton>
                    }
                    secondaryText={
                      <p>
                        <span>{props.posts[key].company}</span><br />
                        <span>{props.posts[key].url}</span>
                      </p>
                    }
                    secondaryTextLines={2}
                  />
                  <Divider inset />
                </div>
              )
            })}
          </List>
        </div>

      </div>
    </div>
  </div>
)

export default SearchList
