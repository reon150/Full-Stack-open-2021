
import React from 'react'
import { connect } from 'react-redux' 

const Notification = ({ notification }) => {
  if (notification === null) return null;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: 10
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification
})



export default connect(
  mapStateToProps,
)(Notification)
