import React from 'react';
import img from '../../assets/IconBackground-1.png'

const ArtCard = () => {
  return (
    <div class="card" style={{width: '18rem', borderRadius: '25px'}}>
      <img src={img} class="card-img-top" alt="..." />
      <div class="card-body">
        <p class="text-start card-text" style={{color: 'blue'}}>
          Some quick 
        </p>
      </div>
    </div>
  );
};

export default ArtCard;