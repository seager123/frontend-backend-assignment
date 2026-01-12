// db.js
import { MongoClient } from "mongodb";

// MongoDB connection string
const uri = "mongodb+srv://seagerpihu_db_user:yhxQfTcRTt28T8XN@cluster0.vguuuw0.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected Successfully!");
    return client;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
