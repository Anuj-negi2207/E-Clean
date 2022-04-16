import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import {MasonryLayout, Spinner } from '../components';
import { feedQuery, searchQuery } from '../utils/data';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null)
  const { categoryId } = useParams();
  useEffect(() => {
    setLoading(true);
    if(categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query)
      .then((data) => {
        setPins(data);
        setLoading(false);
      })
    } else {
      client.fetch(feedQuery)
      .then((data) => {
        setPins(data);
        setLoading(false);
      })

    }
  }, [categoryId])
  

  //Spinner - self closing component - return message
  if(loading) return <Spinner message="Updating New Field!"/>
  if(!pins?.length) return <h2>No Pins Available</h2>

  return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed