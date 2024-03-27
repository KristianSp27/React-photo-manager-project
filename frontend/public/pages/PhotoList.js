import React, { useEffect, useState } from "react";
import axios from "axios";

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/photos");
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  return (
    <div>
      <h2>Photos</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo._id}>{photo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PhotoList;
