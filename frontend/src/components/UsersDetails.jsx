import React from 'react'

const UsersDetails = ({user}) => {
  return (
    <div className="user-details">
       <h1>{user.firstName}</h1>
      <h1>{user.lastName}</h1>
       <h3>{user.email}</h3>
       <h3>{user.phoneNumber}</h3>
       <p>{user.createdAt}</p>
    </div>
  )
}

export default UsersDetails