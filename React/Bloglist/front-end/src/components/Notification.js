import React from 'react'

const Notification = ({message, flag}) => {
  let classname = 'message'
  if(!message) {
    return null
  }
  else if(flag) {
    classname += ' error'
  }
  else {
    classname += ' success'
  }
  return (
    <div className={classname}>
      {message}
    </div>
  )
}

export default Notification
