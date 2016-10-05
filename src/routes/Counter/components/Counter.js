import React from 'react'

export const Counter = (props) => (
  <div style={{ margin: '0 auto' }} >
    <button className='btn btn-default' onClick={props.fetchPosts}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default'>
      Double (Async)
    </button>
  </div>
)


export default Counter
