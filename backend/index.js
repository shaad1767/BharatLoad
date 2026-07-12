import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import mainRoutes from "./routes/mainRoutes.js";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the "uploads" directory
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// Routes
app.use("/api", mainRoutes);

connectDB();


app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(5000, () => {
    console.log("Server running on 5000");
});