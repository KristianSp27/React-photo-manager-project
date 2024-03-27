const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 5000;

app.use(bodyParser.json());

const url = "mongodb://localhost:27017";
const dbName = "photo_gallery";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }

  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("photos");

  app.post("/photos", async (req, res) => {
    try {
      const result = await collection.insertOne(req.body);
      res.status(201).send(result.ops[0]);
    } catch (err) {
      console.error("Error creating photo:", err);
      res.status(500).send("Error creating photo");
    }
  });

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
});

app.post("/photos", async (req, res) => {
  try {
    const result = await collection.insertOne(req.body);
    res.status(201).send(result.ops[0]);
  } catch (err) {
    console.error("Error creating photo:", err);
    res.status(500).send("Error creating photo");
  }
});

app.get("/photos", async (req, res) => {
  try {
    const photos = await collection.find().toArray();
    res.status(200).send(photos);
  } catch (err) {
    console.error("Error fetching photos:", err);
    res.status(500).send("Error fetching photos");
  }
});

app.get("/photos/:id", async (req, res) => {
  try {
    const photo = await collection.findOne({ _id: ObjectId(req.params.id) });
    if (!photo) {
      return res.status(404).send("Photo not found");
    }
    res.status(200).send(photo);
  } catch (err) {
    console.error("Error fetching photo:", err);
    res.status(500).send("Error fetching photo");
  }
});

app.put("/photos/:id", async (req, res) => {
  try {
    const result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
    if (result.modifiedCount === 0) {
      return res.status(404).send("Photo not found");
    }
    res.status(200).send("Photo updated successfully");
  } catch (err) {
    console.error("Error updating photo:", err);
    res.status(500).send("Error updating photo");
  }
});

app.delete("/photos/:id", async (req, res) => {
  try {
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).send("Photo not found");
    }
    res.status(200).send("Photo deleted successfully");
  } catch (err) {
    console.error("Error deleting photo:", err);
    res.status(500).send("Error deleting photo");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
