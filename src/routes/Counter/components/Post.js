import React from 'react'
import Counter from './Counter'

export const Post = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h1>Author: {props.data.author}</h1>
  </div>
)


export default Post
