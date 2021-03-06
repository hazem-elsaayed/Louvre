import React, { useEffect, useState } from 'react';
import ArtCard from '../ArtCard/ArtCard';
import Paginator from "../Paginator/Paginator";

const ArtGrid = () => {
  const [arts, setArts] = useState([])
  const [count, setCount] = useState([])

  useEffect(async () => {
    await updateArts(1)
  }, []);

  const updateArts = async (page) => {
    let res = await fetch(`http://localhost:5000/private/getArts?page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('token'),
      },
    });
    res = await res.json()
    setArts(res.arts)
    setCount(res.count)
  }

  const handlePaginatorChange = async (newPage) => {
    await updateArts(newPage)
  }

  return (
    <div>
      <h2 className="text-start">Gallary</h2>
      <div className="d-flex justify-content-evenly row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {!!arts.length && arts
          .map((art, i) => (
            <ArtCard art={art} className="col" />
          ))}
      </div>
        <div className='d-flex justify-content-center m-3'>
          {!!arts.length && <Paginator change={handlePaginatorChange} count={count}/>}
        </div>
    </div>
  );
};

export default ArtGrid;
