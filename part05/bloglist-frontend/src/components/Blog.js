import React, { useEffect, useState } from 'react'

const Blog = ({ blog, increaseLike, remove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)
  const [belongsToUser, setBelongsToUser] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    const user = JSON.parse(loggedUserJSON)

    setBelongsToUser(user.username === blog.user.username)
  }, [blog.user.username])

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={increaseLike}>like</button>
        <button onClick={toggleShowDetails}>{showDetails ? 'hide': 'view'}</button>
      </div>
      {showDetails ?
        <div>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes}
          </div>
          <div>
            {blog.user.name}
          </div>
          {belongsToUser ?
            <div>
              <button button onClick={remove}>remove</button>
            </div> :
            <></>
          }
        </div>  :
        <></>
      }
    </div>
  )
}

export default Blog