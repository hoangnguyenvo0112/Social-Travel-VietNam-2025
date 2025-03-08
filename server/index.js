require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const SocketServer = require("./socketServer");
const { ExpressPeerServer } = require("peer");
const path = require("path");
const customResponse = require("./dtos/wrapperResponse");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Socket
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["https://travelbee.onrender.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH"],
  },
});

io.on("connection", (socket) => {
  SocketServer(socket);
});

// Create peer server
// ExpressPeerServer(http, { path: "/" });

// Routes
app.use(function (req, res, next) {
  res = customResponse(res);
  next();
});
app.get("/", (req, res) => {
  return res.success("hello");
});
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));
app.use("/api", require("./routes/commentRouter"));
app.use("/api", require("./routes/notifyRouter"));
app.use("/api", require("./routes/messageRouter"));
app.use("/api", require("./routes/groupRouter"));
app.use("/api", require("./routes/analystRouter"));
app.use("/api", require("./routes/friendRouter"));
app.use("/api", require("./routes/paymentRouter"));
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

const port = process.env.PORT || 5000;

http.listen(port, () => {
  console.log("Server is running on port", port);
});

module.exports = app;
