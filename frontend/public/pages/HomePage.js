import React, { useState, useEffect } from "react";
import PhotoList from "../components/PhotoList";
import PhotoForm from "../components/PhotoForm";
import { getAllPhotos } from "../services/api";

function HomePage() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const data = await getAllPhotos();
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  return (
    <div>
      <h1>My Photo Gallery</h1>
      <PhotoForm />
      <PhotoList photos={photos} />
    </div>
  );
}

export default HomePage;
