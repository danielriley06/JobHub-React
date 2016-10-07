import React, { Component, PropTypes } from 'react'
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

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
}

const listItemData = [
  {
    id: 1,
    company: 'WalMart',
    date: '10-06-2016',
    location: 'New York City, NY',
  },
  {
    id: 2,
    company: 'Peeps N Peens',
    date: '10-01-2016',
    location: 'New York City, NY',
  },
  {
    id: 3,
    company: 'Alocholics Anonymous',
    date: '09-06-2016',
    location: 'New York City, NY',
  },
  {
    id: 4,
    company: "Luna's Bean Emporium",
    date: '10-12-2016',
    location: 'New York City, NY',
  },
  {
    id: 5,
    company: 'Penn Station Homeless Committee',
    date: '10-08-2016',
    location: 'New York City, NY',
  },
  {
    id: 6,
    company: 'Choxi',
    date: '10-14-2016',
    location: 'New York City, NY',
  },
  {
    id: 7,
    company: 'UltraShitTMS',
    date: '09-28-2016',
    location: 'New York City, NY',
  },
  {
    id: 8,
    company: "Hillary Clinton's Peep Cleaner",
    date: '10-06-2016',
    location: 'New York City, NY',
  },
]

const JobProspectGridList = () => (
  <div className="row">
    <div className="col-xs-6">
      <div className="jobgridlist">
        <List>
          <Subheader>Current Job Prospects</Subheader>
          <Divider inset={true} />
          {listItemData.map((listItem) => (
            <div>
              <ListItem
                key={listItem.id}
                primaryText={listItem.company}
                rightIcon={<ActionInfo />}
                secondaryText={
                  <p>
                    <span>{listItem.date}</span><br />
                    <span>{listItem.location}</span>
                  </p>
                }
                secondaryTextLines={2}
              />
              <Divider inset={true} />
            </div>
          ))}
        </List>
      </div>
      <RaisedButton label="Add Job Prospect" secondary={true} fullWidth={true} style={{marginTop: '10px'}} />
    </div>
  </div>
)

export default JobProspectGridList
