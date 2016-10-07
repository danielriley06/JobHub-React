import React, { PropTypes } from 'react'

const Post = ({posts}) => (
  <ul>
    {posts.map((post, i) =>
      <li key={i}>{post.author}</li>
    )}
  </ul>
)


export default Post
