import React, { Component, PropTypes } from 'react'
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

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: '500px',
    height: '500px',
    overflowY: 'auto',
    marginBottom: '24px'
  }
}

const JobProspectTable = ({jobs, lastUpdated, handleOpen, state}) => (

    <div className='col-xs-12'>
      <div className='jobgridlist'>
          <List>
            <Subheader>Current Job Prospects - Last updated at {new Date(lastUpdated).toLocaleTimeString()}</Subheader>
            <Divider inset />
            {jobs.map((listItem) => (
              <div>
                <ListItem
                  key={listItem.id.toString()}
                  primaryText={listItem.company}
                  rightIcon={<ActionInfo />}
                  onTouchTap={() => handleOpen(listItem)}
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
      <RaisedButton label='Add Job Prospect' secondary fullWidth style={{ marginTop: '10px' }} onTouchTap={handleOpen} />
    </div>

)

export default JobProspectTable
