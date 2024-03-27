import React, { useState } from "react";
import axios from "axios";

const PhotoForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/photos", { title, description });
      onSubmit(response.data);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating photo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Add Photo</button>
    </form>
  );
};

export default PhotoForm;
