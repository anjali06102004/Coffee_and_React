
import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
  
  //optimized way
   const data = useLoaderData()




    // we want to fetch api when component loads or mount
    // const [data, setData] = useState([])
    // useEffect(() => {
    //       fetch('https://api.github.com/users/hiteshchoudhary')
    //       .then(response => response.json())
    //       .then(data => {
    //         console.log(data);
    //         setData(data)
    //       })
    // }, [])
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 
    text-3xl'>Github followers: {data.followers} 
    
    <img src={data.avatar_url} alt="Git Profile Pic" width={300}/>  GitId: {data.id}</div>
  )
}

export default Github


export const githubInfoLoader = async () => {
  const response = await fetch('https://api.github.com/users/anjali06102004')
        return response.json()
}