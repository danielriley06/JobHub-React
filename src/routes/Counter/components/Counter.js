import React from 'react'
import Post from './Post'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ActionInfo from 'material-ui/svg-icons/action/info'
import RaisedButton from 'material-ui/RaisedButton'

export const Counter = (props) => (
  <div style={{ margin: '0 auto' }} >
    <button className='btn btn-default' onClick={props.fetchPosts}>
      Fetch Posts
    </button>
    <div className="row">
      <div className="col-xs-6">
        <div className="jobgridlist">
          <List>
            <Subheader>Current Job Prospects</Subheader>
            <Divider inset={true} />
            {Object.keys(props.posts).map(key => {
              return (
              <div>
                <ListItem
                  key={props.posts[key].id}
                  primaryText={props.posts[key].title}
                  rightIcon={<ActionInfo />}
                  secondaryText={
                    <p>
                      <span>{props.posts[key].author}</span><br />
                      <span>{props.posts[key].permalink}</span>
                    </p>
                  }
                  secondaryTextLines={2}
                />
                <Divider inset={true} />
              </div>
            )
            })}
          </List>
        </div>
      </div>
    </div>
  </div>
)


export default Counter
