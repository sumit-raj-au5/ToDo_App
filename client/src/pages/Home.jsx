import React from 'react'
import ToDo from "../components/ToDo"

function Home({user}) {
  return (
    <div><ToDo user={user}/></div>
  )
}

export default Home