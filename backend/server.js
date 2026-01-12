const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const uri = "mongodb+srv://seagerpihu_db_user:yhxQfTcRTt28T8XN@cluster0.vguuuw0.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function startServer() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ MongoDB Connected Successfully!");

    const db = client.db("mydatabase");         // Database name
    const tasksCollection = db.collection("tasks"); // Tasks collection

    // ---------------- TEST ----------------
    app.get("/", (req, res) => {
      res.send("Backend is running 🚀");
    });

    // ---------------- LOGIN ----------------
    app.post("/login", (req, res) => {
      const { email, password } = req.body;

      if (email && password) {
        res.json({
          success: true,
          token: "fake-jwt-token",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }
    });

    // ---------------- TASKS (CRUD) ----------------

    // GET tasks
    app.get("/tasks", async (req, res) => {
      try {
        const tasks = await tasksCollection.find().toArray();
        res.json(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // POST task (Add task) ✅
    app.post("/tasks", async (req, res) => {
      const { title } = req.body;
      if (!title) return res.status(400).json({ message: "Title required" });

      try {
        const newTask = { title };
        const result = await tasksCollection.insertOne(newTask);

        // Include insertedId as _id for frontend
        newTask._id = result.insertedId;

        res.status(201).json(newTask);

      } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // DELETE task
    app.delete("/tasks/:id", async (req, res) => {
      try {
        const id = req.params.id;
        await tasksCollection.deleteOne({ _id: new ObjectId(id) });
        res.json({ success: true });
      } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}

// Start the backend server
startServer();
