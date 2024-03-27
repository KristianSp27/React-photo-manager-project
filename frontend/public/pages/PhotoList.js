import React from "react";

function PhotoList({ photos }) {
  return (
    <div>
      <h2>Photos</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.url} alt={photo.title} />
            <p>{photo.title}</p>
            <p>{photo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PhotoList;
