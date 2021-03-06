const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
//Set the path to access env variables
dotenv.config({ path: "./config/config.env" });

connectDB();

//Router
let apiRouter = require("./routes/api");

const app = express();

const server = http.createServer(app);
app.use(cors());
app.use(express.json());
//multer

app.use("/api", apiRouter);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server has started ${PORT}`));
