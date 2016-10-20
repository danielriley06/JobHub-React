import React, { Component, PropTypes } from 'react'
import { List, ListItem } from 'material-ui/List'
import JobProspectModalForm from './JobProspectModal'
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

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24
  }
}

const JobProspectTable = ({posts, lastUpdated, handleOpen, state}) => (
  <div className='row'>
    <div className='col-xs-12 col-lg-6'>
      <div className='jobgridlist'>
        <JobProspectModalForm state={state} />
          <List>
            <Subheader>Current Job Prospects - Last updated at {new Date(lastUpdated).toLocaleTimeString()}</Subheader>
            <Divider inset />
            {posts.map((listItem) => (
              <div>
                <ListItem
                  key={listItem.id}
                  primaryText={listItem.company}
                  rightIcon={<ActionInfo />}
                  onTouchTap={handleOpen}
                  secondaryText={
                    <p>
                      <span>{listItem.jobtitle}</span><br />
                      <span>{listItem.city}, {listItem.state}</span>
                    </p>
                  }
                  secondaryTextLines={2}
                />
                <Divider inset />
              </div>
            ))}
          </List>
      </div>
      <RaisedButton label='Add Job Prospect' secondary fullWidth style={{ marginTop: '10px' }} />
    </div>
  </div>
)

export default JobProspectTable
