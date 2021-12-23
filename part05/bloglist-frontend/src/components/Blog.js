import React, { useState } from 'react'

const Blog = ({ blog, increaseLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle}>
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
        </div>  :
        <></>
      }
    </div>
  )
}

export default Blog