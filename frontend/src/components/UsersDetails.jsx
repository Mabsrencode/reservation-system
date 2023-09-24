import React from 'react'

const UsersDetails = ({user}) => {
  const handleClick = async () => {
    const response = await fetch('/api/users/'+user,_id,{
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok){
      
    }
  }
  return (
    <div className="user-details">
       <h1>{user.firstName}</h1>
      <h1>{user.lastName}</h1>
       <h3>{user.email}</h3>
       <h3>{user.phoneNumber}</h3>
       <p>{user.createdAt}</p>
       <span className="button" onClick={handleClick}>Delete</span>
    </div>
  )
}

export default UsersDetails