import React from 'react';
import './image-display.css';

// name is a string 
// data is an array
const Creatures = ({ data, name}) => {
  const creatureImages = data.map(creature => {
    // because creature is being destructured,
    // we can tell it's an object
    const { id, image } = creature;
    return <img src={image} key={id} id={id} className="app-img"/>
  });
  return (
    <>
      <h1>{name}!</h1>
      {creatureImages}
    </>
  )

}

export default Creatures;
