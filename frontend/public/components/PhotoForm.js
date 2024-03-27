import React, { useState } from "react";

function PhotoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted:", { title, description, image });
      setTitle("");
      setDescription("");
      setImage(null);
      setError("");
    } catch (error) {
      setError("Failed to submit form. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h2>Add Photo</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <button type="submit">Add Photo</button>
      </form>
    </div>
  );
}

export default PhotoForm;
