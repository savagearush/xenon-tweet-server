import express from "express";
import cors from "cors";
import morgan from "morgan";
import startdb from "./db.js";
import User from "./routes/User.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/user", User);

// Start MongoDB Server
startdb();

app.get("/check", (req, res) => {
  res.status(200).send("Server is working");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
