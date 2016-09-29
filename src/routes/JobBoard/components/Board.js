import React, { PropTypes } from 'react'
import Posts from './Posts'

import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



const JobBoardGridList = ({ posts, onPostIconClick }) => (
  <div className="row">
    <div className="col-xs-12">
      <div className="jobgridlist">
        <List>
          <Subheader>Indeed Job Posts</Subheader>
          <Divider inset={true} />
          {Posts.map((Post) => (
            <div>
              <ListItem
                key={Post.id}
                primaryText={
                  {Post.company}  --  {Post.jobtitle}
                }
                rightIcon={
                  <FloatingActionButton mini={true} secondary={true} style={style}>
                    <ContentAdd />
                  </FloatingActionButton>
                }
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>{Post.formattedRelativeTime}</span><br />
                    <span style={{color: darkBlack}}>{Post.formattedLocation}</span><br />
                    {Post.snippet}
                    {Post.url}
                  </p>
                }
              />
              <Divider inset={true} />
            </div>
          ))}
        </List>
      </div>
    </div>
  </div>
);

export default JobProspectGridList;
