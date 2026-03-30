import express from "express";

const app = express();
import "dotenv/config"

import { connectDB } from "./configs/db.js";
connectDB();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


import userRoutes from "./routes/user.route.js";
// routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("server is running");
});



const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


